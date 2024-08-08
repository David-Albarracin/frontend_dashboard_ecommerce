import { Component, inject, OnInit } from '@angular/core';
import { DashboardTableComponent } from "../../dashboard-table/dashboard-table.component";
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CacheService } from '../../../../services/cache.service';
import { DashboardSelectComponent } from "../../dashboard-select/dashboard-select.component";
import { DialogPortalService } from '../../../../services/dialog-portal.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Orders } from '../../../../models/ecommerceModels';

@Component({
  selector: 'app-dashboard-orders-list',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [DashboardTableComponent, MatButtonModule,FormsModule,ReactiveFormsModule, MatMenuModule, RouterLink, MatIconModule, MatFormFieldModule, MatInputModule, DashboardSelectComponent, MatDatepickerModule],
  templateUrl: './dashboard-orders-list.component.html',
  styleUrl: './dashboard-orders-list.component.scss'
})
export class DashboardOrdersListComponent implements OnInit{

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  mainData!:any;


  filter = ''

  cacheService = inject(CacheService);
  router = inject(Router);

  tableName= "pedidos"

  tableHeader=[
    "orderId",
    "customer.firstName",
    "orderDate",
    "commentary",
    "status.name",
    "orderType"
  ]

  tableData=[]

  dialogPortal = inject(DialogPortalService)

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.filter = filterValue;
  }

  ngOnInit(): void {
    this.cacheService.httpGetList(this.tableName).subscribe(res => {
      this.mainData = res  
      this.tableData = res;
    });
    // Subscribe to changes in the start and end date controls
    this.range.get('start')?.valueChanges.subscribe(start => {
      this.filterDataByRange();
    });

    this.range.get('end')?.valueChanges.subscribe(end => {
      this.filterDataByRange();
    });
  }

  handleActionClick(data: any): void {
    switch (data.type) {
      case "edit":
        this.router.navigateByUrl(`/dashboard/${this.tableName}/editar/${data.row.orderId}`)
        break;
    
      case "delete":
        this.cacheService.httpDeleteById(this.tableName, data.row.orderId).subscribe(res => {
          console.log(res);
          
        });
        break;
    }
  }

  filterByStatus(){
    this.dialogPortal.openFilterDialog('status', this.tableName)
  }

  filterDataByRange() {
    const startDate = this.range.get('start')?.value;
    const endDate = this.range.get('end')?.value;


    if (startDate && endDate) {
      this.tableData = this.mainData.filter((item:any) => {
        const orderDate = new Date(item.orderDate);
        endDate?.setHours(23, 59, 59, 999);
        orderDate?.setHours(24);
        return ((orderDate >= startDate) && (orderDate <= endDate));
      });
    }
  }

}
