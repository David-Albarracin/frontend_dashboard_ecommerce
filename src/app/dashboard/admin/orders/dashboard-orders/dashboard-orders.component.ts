import { Orders, Employee, Supplier, Customer, Status } from './../../../../models/ecommerceModels';
import { Component, inject, OnDestroy, signal } from '@angular/core';
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
import { DashboardOrdersDetailsListComponent } from "../../orders-details/dashboard-orders-details-list/dashboard-orders-details-list.component";

@Component({
  selector: 'app-dashboard-orders',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule, DashboardSelectComponent, DashboardOrdersDetailsComponent, DashboardOrdersDetailsListComponent],
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
        console.log(res);
        
        this.createForm(this.orders as Orders)

      }))
    }))

  }

  customer!:any;
  status!:any;
  orderType!:any;
  orderDetails = signal<any[]>([]);

  createForm(data?: Orders): void {
    
    this.orderDetails.set(data?.orderDetails? data.orderDetails:[]);
    // Extracting ordersGamaId from data if it exists
    this.customer = (data?.customer as Customer);
    this.status = (data?.status as Status);
    this.orderType = data?.orderType || ''
  
    this.ordersForm = this.fb.group({
      //ordersId: [data?.ordersId || '', Validators.required],
      orderDate: [data?.orderDate || '', Validators.required],
      expectedDate: [data?.expectedDate || ''],
      deliverDate: [data?.deliverDate || ''],
      commentary: [data?.commentary || ''],
      status: [this.status],
      orderType: [data?.orderType || ''],
      customer: [this.customer],
      orderDetails:[]
    });
  }

  addNewOrderDetail(data:any){
    //console.log(data);
    console.log(data);
    this.orderDetails().push(data);
  }


  onSubmit(): void {
    if (this.ordersForm.valid) {
      //console.log(typeof(this.ordersForm.value["ordersGama"]));
      //this.ordersForm.value["ordersGama"] as String
      this.ordersForm.get("orderDetails")?.setValue(this.orderDetails());
      console.log( this.ordersForm.value );
      
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

  customerSelect(data: any): void {
    this.ordersForm.get("customer")!.setValue(data);
  }

  orderTypeSelect(data: any): void {
    this.ordersForm.get("orderType")!.setValue(data);
  }

  statusSelect(data: any): void {
    this.ordersForm.get("status")!.setValue(data);
  }

  ngOnDestroy() {
    this.subs$.forEach(e => e.unsubscribe())
  }

}
