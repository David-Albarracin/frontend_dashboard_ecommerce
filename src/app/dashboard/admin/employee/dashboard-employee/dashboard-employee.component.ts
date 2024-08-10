import { Charge, Employee, Office } from './../../../../models/ecommerceModels';
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
  selector: 'app-dashboard-employee',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule, DashboardSelectComponent],
  templateUrl: './dashboard-employee.component.html',
  styleUrl: './dashboard-employee.component.scss'
})
export class DashboardEmployeeComponent implements OnDestroy {

  tableName = "empleados"

  subs$: Subscription[] = []

  employeeForm!: FormGroup;
  gamas: any[] = []; // Array para almacenar las gamas de 
  employee!: {}

  cacheService = inject(CacheService);
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(DialogPortalService);


  ngOnInit(): void {
    this.createForm()
    this.subs$.push(this.activatedRoute.params.subscribe(params => {
      const employee$ = params['id']
        ? this.cacheService.httpGetById(this.tableName, params['id']).pipe(
          catchError(error => {
            console.error('Error fetching employee', error);
            this.router.navigateByUrl("/dashboard/" + this.tableName)
            return of({}); // Retorna un Observable con un objeto vacío en caso de error
          })
        )
        : of({});
      this.subs$.push(employee$.subscribe(res => {
        this.employee = res;
        this.createForm(this.employee as Employee)

      }))
    }))

  }

  office!:any
  charge!:any
  boss!: any
  documentType!:any

  createForm(data?: Employee): void {
    // Extracting employeeGamaId from data if it exists
    this.office = (data?.office as Office) || '';
    this.charge = (data?.charge as Charge) || '';
    this.boss = (data?.boss as Employee) || '';
    this.documentType = (data?.documentType) || '';


    // Initializing the form with default values or provided data

    this.employeeForm = this.fb.group({
      //employeeId: [data?.employeeId || '', Validators.required],
      firstName: [data?.firstName || ''],
      secondName: [data?.secondName, Validators.required],
      firstSurname: [data?.firstSurname || ''],
      secondSurname: [data?.secondSurname || ''],
      documentNumber: [data?.documentNumber || ''],
      documentType: [this.documentType || ''],
      phoneNumber: [data?.phoneNumber, Validators.required],
      office: [this.office || ''],
      extension: [data?.extension || ''],
      charge: [this.charge || ''],
      boss: [this.boss]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      //console.log(typeof(this.employeeForm.value["employeeGama"]));
      //this.employeeForm.value["employeeGama"] as String
      const employee = {
        "firstName": this.employeeForm.get("firstName")?.value,
        "secondName": this.employeeForm.get("secondName")?.value,
        "firstSurname": this.employeeForm.get("firstSurname")?.value,
        "secondSurname": this.employeeForm.get("secondSurname")?.value,
        "documentNumber": this.employeeForm.get("documentNumber")?.value,
        "documentType": this.employeeForm.get("documentType")?.value,
        "phoneNumber": this.employeeForm.get("phoneNumber")?.value,
        "officeId": this.employeeForm.get("office")?.value.officeId,
        "extension": this.employeeForm.get("extension")?.value,
        "charge": this.employeeForm.get("charge")?.value,
        "bossId": this.employeeForm.get("boss")?.value.employeeId,
    }


      if ((this.employee as any).employeeId) {
        this.cacheService.httpUpdate(this.tableName, (this.employee as any).employeeId, employee).subscribe((res: any) => {
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.firstName); })
        })
      } else {
        this.cacheService.httpCreate(this.tableName, employee).subscribe((res: any) => {
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.firstName); })
        })
      }
      // Aquí puedes llamar a tu servicio para enviar los datos
    }
  }

  handleSelectChange(data: any, rowName:string): void {
    this.employeeForm.get(rowName)!.setValue(data);
  }

  handleSelectChangeDocument(data: any, rowName:string): void {
    this.employeeForm.get(rowName)!.setValue(data.documentTypeId);
  }

  ngOnDestroy() {
    this.subs$.forEach(e => e.unsubscribe())
  }

}
