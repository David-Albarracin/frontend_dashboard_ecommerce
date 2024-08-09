import { Product, ProductGama, Supplier } from './../../../../models/ecommerceModels';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CacheService } from '../../../../services/cache.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { catchError } from 'rxjs/internal/operators/catchError';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { of } from 'rxjs/internal/observable/of';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { DialogPortalService } from '../../../../services/dialog-portal.service';
import { DashboardSelectComponent } from '../../dashboard-select/dashboard-select.component';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-dashboard-products',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule, DashboardSelectComponent],
  templateUrl: './dashboard-products.component.html',
  styleUrl: './dashboard-products.component.scss'
})
export class DashboardProductsComponent implements OnDestroy {

  tableName = "productos"

  subs$: Subscription[] = []

  productForm!: FormGroup;
  gamas: any[] = []; // Array para almacenar las gamas de productos
  product!: {}

  cacheService = inject(CacheService);
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(DialogPortalService);


  ngOnInit(): void {
    this.createForm()
    this.subs$.push(this.activatedRoute.params.subscribe(params => {
      const product$ = params['id']
        ? this.cacheService.httpGetById(this.tableName, params['id']).pipe(
          catchError(error => {
            console.error('Error fetching product', error);
            this.router.navigateByUrl("/dashboard/" + this.tableName)
            return of({}); // Retorna un Observable con un objeto vacío en caso de error
          })
        )
        : of({});
      this.subs$.push(product$.subscribe(res => {
        this.product = res;
        this.createForm(this.product as Product)

      }))
    }))

  }

  productGamaId!:any
  supplierId!:any

  createForm(data?: Product): void {
    // Extracting productGamaId from data if it exists
    this.productGamaId = (data?.productGama as ProductGama)?.productGamaId || '';
    this.supplierId = (data?.supplier as Supplier)?.supplierId || '';
    // Initializing the form with default values or provided data

    this.productForm = this.fb.group({
      code: [data?.code || '', Validators.required],
      name: [data?.name || ''],
      productGama: [this.productGamaId, Validators.required],
      description: [data?.description || ''],
      stock: [data?.stock || ''],
      priceSale: [data?.priceSale || ''],
      priceBuy: [data?.priceBuy || ''],
      supplier: [this.supplierId, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      //console.log(typeof(this.productForm.value["productGama"]));
      //this.productForm.value["productGama"] as String
      if ((this.product as any).productId) {
        this.cacheService.httpUpdate(this.tableName, (this.product as any).productId, this.productForm.value).subscribe((res: any) => {
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.name); })
        })
      } else {
        this.cacheService.httpCreate(this.tableName, this.productForm.value).subscribe((res: any) => {
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.name); })
        })
      }
      // Aquí puedes llamar a tu servicio para enviar los datos
    }
  }

  handleSelectChangeGama(data: any): void {

    this.productForm.get('productGama')!.setValue(data.productGamaId);
  }

  
  handleSelectChangeProvider(data: any): void {

    this.productForm.get('supplier')!.setValue(data.supplierId);
  }

  ngOnDestroy() {
    this.subs$.forEach(e => e.unsubscribe())
  }

}
