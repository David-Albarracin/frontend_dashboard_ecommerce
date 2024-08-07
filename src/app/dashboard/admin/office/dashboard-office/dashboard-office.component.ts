import { Charge, City, Office } from './../../../../models/ecommerceModels';
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
  selector: 'app-dashboard-office',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule, DashboardSelectComponent],
  templateUrl: './dashboard-office.component.html',
  styleUrl: './dashboard-office.component.scss'
})
export class DashboardOfficeComponent implements OnDestroy {

  tableName = "oficinas"

  subs$: Subscription[] = []

  officeForm!: FormGroup;
  gamas: any[] = []; // Array para almacenar las gamas de 
  office!: {}

  cacheService = inject(CacheService);
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(DialogPortalService);


  ngOnInit(): void {
    this.createForm()
    this.subs$.push(this.activatedRoute.params.subscribe(params => {
      const office$ = params['id']
        ? this.cacheService.httpGetById(this.tableName, params['id']).pipe(
          catchError(error => {
            console.error('Error fetching office', error);
            this.router.navigateByUrl("/dashboard/" + this.tableName)
            return of({}); // Retorna un Observable con un objeto vacío en caso de error
          })
        )
        : of({});
      this.subs$.push(office$.subscribe(res => {
        this.office = res;
        console.log(res);
        
        this.createForm(this.office as Office)

      }))
    }))

  }

  cityId!:any


  createForm(data?: Office): void {
    // Extracting officeGamaId from data if it exists
    this.cityId = (data?.city as City)?.cityId || '';


    // Initializing the form with default values or provided data

    this.officeForm = this.fb.group({
      //officeId: [data?.officeId || '', Validators.required],
      addressLine1: [data?.addressLine1 || ''],
      addressLine2: [data?.addressLine2 || ''],
      city: [this.cityId]
    });
  }

  onSubmit(): void {
    if (this.officeForm.valid) {
      //console.log(typeof(this.officeForm.value["officeGama"]));
      //this.officeForm.value["officeGama"] as String
      if ((this.office as any).officeId) {
        this.cacheService.httpUpdate(this.tableName, (this.office as any).officeId, this.officeForm.value).subscribe((res: any) => {
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.name); })
        })
      } else {
        this.cacheService.httpCreate(this.tableName, this.officeForm.value).subscribe((res: any) => {
          this.router.navigateByUrl("/dashboard/" + this.tableName).then(() => { this.dialog.openSuccess(res.name); })
        })
      }
      // Aquí puedes llamar a tu servicio para enviar los datos
    }
  }

  handleSelectChange(data: any, rowName:string): void {
    this.officeForm.get(rowName)!.setValue(data);
  }



  ngOnDestroy() {
    this.subs$.forEach(e => e.unsubscribe())
  }

}
