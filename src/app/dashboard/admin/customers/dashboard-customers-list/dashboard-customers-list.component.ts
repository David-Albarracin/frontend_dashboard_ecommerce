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

@Component({
  selector: 'app-dashboard-customers-list',
  standalone: true,
  imports: [DashboardTableComponent, MatButtonModule, MatMenuModule, RouterLink, MatIconModule, MatFormFieldModule, MatInputModule, DashboardSelectComponent],
  templateUrl: './dashboard-customers-list.component.html',
  styleUrl: './dashboard-customers-list.component.scss'
})
export class DashboardCustomersListComponent implements OnInit{

  filter = ''

  cacheService = inject(CacheService);
  dialogPortal = inject(DialogPortalService);

  router = inject(Router);

  tableName= "clientes"

  tableHeader=[
    "customerId",
    "documentNumber",
    "firstName",
    "audit.isActive",
    "employee.firstName"
  ]

  tableData=[]

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.filter = filterValue;
  }

  ngOnInit(): void {
    this.cacheService.httpGetList(this.tableName).subscribe(res => {
      this.tableData = res;
    });
  }

  handleActionClick(data: any): void {
    switch (data.type) {
      case "edit":
        this.router.navigateByUrl(`/dashboard/${this.tableName}/editar/${data.row.customerId}`)
        break;
    
      case "delete":
        this.cacheService.httpDeleteById(this.tableName, data.row.customerId).subscribe(res => {
          console.log(res);
          
        });
        break;
    }
  }

  filterByCity(){
    this.dialogPortal.openFilterDialog('city', this.tableName)
  }

  filterByOrderStatusPendent(){
    this.dialogPortal.openFilterDialog('status', this.tableName)
  }

}
