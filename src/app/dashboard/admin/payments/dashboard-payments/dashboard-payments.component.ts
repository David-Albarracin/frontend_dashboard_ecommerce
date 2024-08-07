import { Employee, Supplier, Customer, Status, Transactions, PayMethods, Orders } from './../../../../models/ecommerceModels';
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
  selector: 'app-dashboard-payments',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule, DashboardSelectComponent],
  templateUrl: './dashboard-payments.component.html',
  styleUrl: './dashboard-payments.component.scss'
})
export class DashboardPaymentsComponent implements OnDestroy {

  tableName = "pagos"

  subs$: Subscription[] = []

  transactionsForm!: FormGroup;
  gamas: any[] = []; // Array para almacenar las gamas de transactions
  transactions!: {}

  cacheService = inject(CacheService);
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(DialogPortalService);


  ngOnInit(): void {
    this.createForm()
    this.subs$.push(this.activatedRoute.params.subscribe(params => {
      const transactions$ = params['id']
        ? this.cacheService.httpGetById(this.tableName, params['id']).pipe(
          catchError(error => {
            console.error('Error fetching transactions', error);
            this.router.navigateByUrl("/dashboard/" + this.tableName)
            return of({}); // Retorna un Observable con un objeto vacío en caso de error
          })
        )
        : of({});
      this.subs$.push(transactions$.subscribe(res => {
        this.transactions = res;
        this.createForm(this.transactions as Transactions)

      }))
    }))

  }

  payMethodId!:any;
  orderId!:any;

  createForm(data?: Transactions): void {
    // Extracting transactionsGamaId from data if it exists
    this.payMethodId = (data?.payMethod as PayMethods)?.payMethodId || '';
    this.orderId = (data?.order as Orders)?.orderId || '';
  
    this.transactionsForm = this.fb.group({
      transactionId: [data?.transactionId || '', [Validators.required]],
      amount: [data?.amount || ''],
      transactionDate: [data?.transactionDate || ''],
      payMethod: [this.payMethodId || ''],
      order: [this.orderId || ''],
     
    });
  }

  onSubmit(): void {
    if (this.transactionsForm.valid) {
      //console.log(typeof(this.transactionsForm.value["transactionsGama"]));
      //this.transactionsForm.value["transactionsGama"] as String
      if ((this.transactions as Transactions).transactionId) {
        this.cacheService.httpUpdate(this.tableName, (this.transactions as any).transactionId, this.transactionsForm.value).subscribe((res: any) => {
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.name); })
        })
      } else {
        this.cacheService.httpCreate(this.tableName, this.transactionsForm.value).subscribe((res: any) => {
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.name); })
        })
      }
      // Aquí puedes llamar a tu servicio para enviar los datos
    }
  }

  handleSelectChange(data: any, rowName:string): void {
    this.transactionsForm.get(rowName)!.setValue(data);
  }



  ngOnDestroy() {
    this.subs$.forEach(e => e.unsubscribe())
  }

}
