import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-dashboard-products',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './dashboard-products.component.html',
  styleUrl: './dashboard-products.component.scss'
})
export class DashboardProductsComponent {

  tableName = "productos"

  private unsubscribe$ = new Subject<void>();

  productForm!: FormGroup;
  gamas: any[] = []; // Array para almacenar las gamas de productos
  product!:{}

  cacheService = inject(CacheService);
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(DialogPortalService);


  ngOnInit(): void {
    this.createForm()
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe$),
      switchMap(params => {
        // Obtener los datos de gamas
        const gamas$ = this.cacheService.httpGetList("gamas").pipe(
          catchError(error => {
            console.error('Error fetching gamas', error);
            return of([]); // Retorna un Observable con un array vacío en caso de error
          })
        );
  
        // Obtener los datos del producto si el parámetro 'id' está presente
        const product$ = params['id'] 
          ? this.cacheService.httpGetById(this.tableName, params['id']).pipe(
              catchError(error => {
                console.error('Error fetching product', error);
                this.router.navigateByUrl("/dashboard/productos")
                return of({}); // Retorna un Observable con un objeto vacío en caso de error
              })
            )
          : of({}); // Si no hay id, retorna un Observable con un objeto vacío
  
        // Combinar los dos Observables
        return forkJoin([gamas$, product$]);
      })
    ).subscribe(
      ([gamasData, productData]) => {
        this.gamas = gamasData;
        this.product = productData;
        console.log(gamasData);
        
        this.createForm(productData);
      },
      error => {
        console.error('Error in forkJoin', error);
        // Manejo de errores adicional si es necesario
      }
    );
  }
  

  createForm(data?: any): void {
    this.productForm = this.fb.group({
      code: [data ? data.code : '', Validators.required],
      name: [data ? data.name : ''],
      productGamaId: [data ? data.productGamaId : '', Validators.required],
      description: [data ? data.description : ''],
      stock: [data ? data.stock : ''],
      price_sale: [data ? data.price_sale : ''],
      price_buy: [data ? data.price_buy : '']
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.cacheService.httpCreate(this.tableName, this.productForm.value).subscribe(res => {
        this.dialog.openSuccess(res);
      })
      // Aquí puedes llamar a tu servicio para enviar los datos
    }
  }

}