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
      console.log(res);
      
      this.tableData = res;
    });
    // this.cacheService.httpGetList("gamas").subscribe(res => {
    //   this.gamas = res;
    // });
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

  filterByCity(){
    this.dialogPortal.openFilterDialog('city', this.tableName)
  }

  filterByOrderStatusPendent(){
    this.cacheService.httpGetList(this.tableName, 'byOrderPendent').subscribe(res => {
      this.tableData = res;
    })
  }

}
