import { Orders, Employee, Supplier, Customer, Status } from './../../../../models/ecommerceModels';
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
import { DashboardOrdersDetailsComponent } from "../../orders-details/dashboard-orders-details/dashboard-orders-details.component";

@Component({
  selector: 'app-dashboard-orders',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule, DashboardSelectComponent, DashboardOrdersDetailsComponent],
  templateUrl: './dashboard-orders.component.html',
  styleUrl: './dashboard-orders.component.scss'
})
export class DashboardOrdersComponent implements OnDestroy {

  tableName = "pedidos"

  subs$: Subscription[] = []

  ordersForm!: FormGroup;
  gamas: any[] = []; // Array para almacenar las gamas de orders
  orders!:Orders

  cacheService = inject(CacheService);
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(DialogPortalService);


  ngOnInit(): void {
    this.createForm()
    this.subs$.push(this.activatedRoute.params.subscribe(params => {
      const orders$ = params['id']
        ? this.cacheService.httpGetById(this.tableName, params['id']).pipe(
          catchError(error => {
            console.error('Error fetching orders', error);
            this.router.navigateByUrl("/dashboard/" + this.tableName)
            return of({}); // Retorna un Observable con un objeto vacío en caso de error
          })
        )
        : of({});
      this.subs$.push(orders$.subscribe(res => {
        this.orders = res as Orders;
        this.createForm(this.orders as Orders)

      }))
    }))

  }

  customerId!:any;
  statusId!:any;
  orderType!:any;

  createForm(data?: Orders): void {
    // Extracting ordersGamaId from data if it exists
    this.customerId = (data?.customer as Customer)?.customerId || '';
    this.statusId = (data?.status as Status)?.orderStatusId || '';
    this.orderType = data?.orderType || ''
  
    this.ordersForm = this.fb.group({
      //ordersId: [data?.ordersId || '', Validators.required],
      orderDate: [data?.orderDate || '', Validators.required],
      expectedDate: [data?.expectedDate || ''],
      deliverDate: [data?.deliverDate || ''],
      commentary: [data?.commentary || ''],
      status: [this.statusId, Validators.required],
      orderType: [data?.orderType || ''],
      customer: [this.customerId]
    });
  }

  onSubmit(): void {
    if (this.ordersForm.valid) {
      //console.log(typeof(this.ordersForm.value["ordersGama"]));
      //this.ordersForm.value["ordersGama"] as String
      //console.log( this.ordersForm.value );
      
      if ((this.orders as Orders).orderId) {
        this.cacheService.httpUpdate(this.tableName, (this.orders as any).orderId, this.ordersForm.value).subscribe((res: any) => {
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.name); })
        })
      } else {
        this.cacheService.httpCreate(this.tableName, this.ordersForm.value).subscribe((res: any) => {
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.name); })
        })
      }
      // Aquí puedes llamar a tu servicio para enviar los datos
    }
  }

  handleSelectChange(data: any, rowName:string): void {
    this.ordersForm.get(rowName)!.setValue(data);
  }

  addProduct(){

  }

  ngOnDestroy() {
    this.subs$.forEach(e => e.unsubscribe())
  }

}
