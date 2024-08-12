import { Customer, CustomerAddress, CustomerPhone, Employee, Supplier } from './../../../../models/ecommerceModels';
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
import { DashboardPhonesComponent } from "../../dashboard-phones/dashboard-phones.component";

@Component({
  selector: 'app-dashboard-customers',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule, DashboardSelectComponent, DashboardPhonesComponent],
  templateUrl: './dashboard-customers.component.html',
  styleUrl: './dashboard-customers.component.scss'
})
export class DashboardCustomersComponent implements OnDestroy {

  tableName = "clientes"

  subs$: Subscription[] = []

  customerForm!: FormGroup;
  customer!: {}

  cacheService = inject(CacheService);
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(DialogPortalService);


  ngOnInit(): void {
    this.createForm()
    this.subs$.push(this.activatedRoute.params.subscribe(params => {
      const customer$ = params['id']
        ? this.cacheService.httpGetById(this.tableName, params['id']).pipe(
          catchError(error => {
            console.error('Error fetching customer', error);
            this.router.navigateByUrl("/dashboard/" + this.tableName)
            return of({}); // Retorna un Observable con un objeto vacío en caso de error
          })
        )
        : of({});
      this.subs$.push(customer$.subscribe(res => {
        this.customer = res;
        this.createForm(this.customer as Customer)

      }))
    }))

  }

  employee!:any
  documentType!:string;

  phones!:CustomerPhone[]
  addresses!:CustomerAddress[]

  createForm(data?: Customer): void {
    // Extracting customerGamaId from data if it exists
    this.employee = (data?.employee as Employee);
    this.documentType = data?.documentType || '';
    this.phones = data?.phones || []
    this.addresses = data?.addresses || []

    data?.addresses
  
    this.customerForm = this.fb.group({
      //customerId: [data?.customerId || '', Validators.required],
      firstName: [data?.firstName || '', Validators.required],
      firstSurname: [data?.firstSurname || ''],
      lastName: [data?.lastName || ''],
      lastSurname: [data?.lastSurname || ''],
      documentNumber: [data?.documentNumber || '', Validators.required],
      documentType: [data?.documentType || ''],
      employee: [data?.employee || ''],
      // addresses: [],
      // phones:[],
      // orders:[],
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      //console.log(typeof(this.customerForm.value["customerGama"]));
      //this.customerForm.value["customerGama"] as String
      //const cityIds = this.addresses.map(address => address.cityId);
      const employeeId = this.customerForm.get("employee")?.value?.employeeId
      const customer = {
        // "customerId": 11, no se necesita si es post
         "firstName": this.customerForm.get("firstName")?.value,
         "firstSurname": this.customerForm.get("firstSurname")?.value,
         "lastName": this.customerForm.get("lastName")?.value,
         "lastSurname": this.customerForm.get("lastSurname")?.value,
         "documentNumber": this.customerForm.get("documentNumber")?.value,
         "documentType": this.customerForm.get("documentType")?.value,
         "employeeId": employeeId? employeeId: this.customerForm.get("employee")?.value,
         "addresses": this.addresses.map(address => {
            const cityId = address.city?.cityId; // Extrae cityId
            const { city, ...restOfAddress } = address; // Desestructura para eliminar city
            return { ...restOfAddress, cityId }; // Crea un nuevo objeto con cityId
          }),
         "phones": this.phones
     }

      if ((this.customer as any).customerId) {
        this.cacheService.httpUpdate(this.tableName, (this.customer as any).customerId, customer).subscribe((res: any) => {
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.firstName); })
        })
      } else {
        console.log(this.customerForm.value);
        this.cacheService.httpCreate(this.tableName, customer).subscribe((res: any) => {  
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.firstName); })
        })
      }
      // Aquí puedes llamar a tu servicio para enviar los datos
    }
  }

  handleSelectChange(data: any, rowName: string, rowId:any): void {
    this.customerForm.get(rowName)!.setValue(data[rowId]);
  }

  addOption(data:any){
    console.log(data);
    
    this.customerForm.get(data.rowName)?.setValue(data.info);
  }

  ngOnDestroy() {
    this.subs$.forEach(e => e.unsubscribe())
  }

}
