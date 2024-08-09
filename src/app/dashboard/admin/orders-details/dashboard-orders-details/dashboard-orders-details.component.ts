import { Component, Inject, inject, Input, model, OnInit } from '@angular/core';
import { OrderDetail, Product } from '../../../../models/ecommerceModels';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DashboardSelectComponent } from "../../dashboard-select/dashboard-select.component";

@Component({
  selector: 'app-dashboard-orders-details',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDialogClose, DashboardSelectComponent],
  templateUrl: './dashboard-orders-details.component.html',
  styleUrl: './dashboard-orders-details.component.scss'
})
export class DashboardOrdersDetailsComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<DashboardOrdersDetailsComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  fb = inject(FormBuilder);

  selectConfig = {
    dataId: 'productId',
    dataName: ['productId', 'name'],
    tableName: 'productos'
  }

  product!:Product

  orderForm = this.fb.group({
    product: [this.product],
    amount: [0],
    lineNumber: [''],
    totalPrice: [0],
    unitPrice: [0],
  });

  amount!:any;
  priceSale!:any;

  @Input() orderDetail!: OrderDetail

  selectData(data:Product){
    this.priceSale = data.priceSale
    const amount =  this.amount? this.amount:1
    const total = (data.priceSale! * amount);
    this.orderForm.get("amount")?.setValue(amount);
    this.orderForm.get("product")?.setValue(data);
    this.orderForm.get("unitPrice")?.setValue(data.priceSale!);
    this.orderForm.get("totalPrice")?.setValue(total)
  }


  ngOnInit(): void {
    this.orderForm.get("amount")?.valueChanges.subscribe(value => {
      this.amount = value
      const total = (this.priceSale! * this.amount);
      this.orderForm.get("totalPrice")?.setValue(total)
    });
  }

 



}
