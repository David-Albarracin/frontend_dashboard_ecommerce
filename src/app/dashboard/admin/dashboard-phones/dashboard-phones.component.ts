import { Charge, City, CustomerAddress, CustomerPhone } from './../../../models/ecommerceModels';
import { Component, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CacheService } from '../../../services/cache.service';
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
import { DialogPortalService } from '../../../services/dialog-portal.service';
import { DashboardSelectComponent } from '../dashboard-select/dashboard-select.component';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-dashboard-phones',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule, DashboardSelectComponent],
  templateUrl: './dashboard-phones.component.html',
  styleUrl: './dashboard-phones.component.scss'
})
export class DashboardPhonesComponent implements OnDestroy {

  @Input() addresses:any[] = [];
  @Input() phones:any[] = [];

  @Output() actionClicked = new EventEmitter<any>();


  subs$: Subscription[] = []

  phoneForm!: FormGroup;
  addressesForm!: FormGroup;

  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.createForm()
  }

  city!:any;

  createForm(phone?: CustomerPhone, addresses?: CustomerAddress): void {
  

    this.phoneForm = this.fb.group({
      //phoneId: [data?.phoneId || '', Validators.required],
      phoneNumber: [phone?.phone_number || ''],
      telephoneType: [phone?.telephone_type || ''],
      //customerId: [data?.customer_id]

    });

    this.city = addresses?.city || ''

    this.addressesForm = this.fb.group({
      //phoneId: [data?.phoneId || '', Validators.required],
      addressLine1: [addresses?.address_line1 || ''],
      addressLine2: [addresses?.address_line2 || ''],
      city: [this.city]

    });
  }

  addPhone(): void {
    const phone =  {
      // "customerPhoneId": 11, no se necesita si es post
      "phoneNumber": this.phoneForm.get('phoneNumber')?.value,
      "telephoneType": this.phoneForm.get('telephoneType')?.value,
  }
  this.phones.push(phone)
  this.actionClicked.emit({rowName: 'phones', info: this.phones})

  }

  addAddresses(): void {
    const address =  {
      // "customerAddressId": 11,no se necesita si es post
      "addressLine1": this.addressesForm.get('addressLine1')?.value,
      "addressLine2": this.addressesForm.get('addressLine2')?.value,
      "city": this.addressesForm.get('city')?.value
    }

    this.addresses.push(address)
    this.actionClicked.emit({rowName: 'address', info: this.addresses})
  }

  handleSelectChange(data: any): void {
    this.addressesForm.get("city")?.setValue(data);
  }



  ngOnDestroy() {
    this.subs$.forEach(e => e.unsubscribe())
  }

}
