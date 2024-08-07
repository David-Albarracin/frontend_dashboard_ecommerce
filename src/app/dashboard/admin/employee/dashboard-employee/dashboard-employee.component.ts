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

  officeId!:any
  chargeId!:any
  bossId!: any


  createForm(data?: Employee): void {
    // Extracting employeeGamaId from data if it exists
    this.officeId = (data?.office as Office)?.officeId || '';
    this.chargeId = (data?.charge as Charge)?.chargeId || '';
    this.bossId = (data?.boss as Employee)?.employeeId || '';

    // Initializing the form with default values or provided data

    this.employeeForm = this.fb.group({
      //employeeId: [data?.employeeId || '', Validators.required],
      firstName: [data?.firstName || ''],
      secondName: [data?.secondName, Validators.required],
      firstSurname: [data?.firstSurname || ''],
      secondSurname: [data?.secondSurname || ''],
      documentNumber: [data?.documentNumber || ''],
      documentType: [data?.documentType || ''],
      phoneNumber: [data?.phoneNumber, Validators.required],
      office: [this.officeId || ''],
      extension: [data?.extension || ''],
      charge: [this.chargeId || ''],
      boss: [this.bossId || '']
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      //console.log(typeof(this.employeeForm.value["employeeGama"]));
      //this.employeeForm.value["employeeGama"] as String
      if ((this.employee as any).employeeId) {
        this.cacheService.httpUpdate(this.tableName, (this.employee as any).employeeId, this.employeeForm.value).subscribe((res: any) => {
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.name); })
        })
      } else {
        this.cacheService.httpCreate(this.tableName, this.employeeForm.value).subscribe((res: any) => {
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.name); })
        })
      }
      // Aquí puedes llamar a tu servicio para enviar los datos
    }
  }

  handleSelectChangeGama(data: any): void {

    this.employeeForm.get('employeeGama')!.setValue(data);
  }

  
  handleSelectChangeProvider(data: any): void {

    this.employeeForm.get('supplier')!.setValue(data);
  }

  ngOnDestroy() {
    this.subs$.forEach(e => e.unsubscribe())
  }

}
