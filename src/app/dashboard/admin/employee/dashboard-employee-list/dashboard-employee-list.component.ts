import { Component, inject, OnInit } from '@angular/core';
import { DashboardTableComponent } from "../../dashboard-table/dashboard-table.component";
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CacheService } from '../../../../services/cache.service';
import { DialogPortalService } from '../../../../services/dialog-portal.service';

@Component({
  selector: 'app-dashboard-employee-list',
  standalone: true,
  imports: [DashboardTableComponent, MatButtonModule, MatMenuModule, RouterLink, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './dashboard-employee-list.component.html',
  styleUrl: './dashboard-employee-list.component.scss'
})
export class DashboardEmployeeListComponent implements OnInit{

  filter = ''

  cacheService = inject(CacheService);
  router = inject(Router);
  dialogPortal = inject(DialogPortalService);

  tableName= "empleados"

  tableHeader=[
    "employeeId",
    "firstName",
    "documentNumber",
    "office.addressLine1",
    "extension",
    "charge.chargeName",
    "boss.firstName"
  ]

  tableData=[]
  gamas:any[]=[]

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
        this.router.navigateByUrl(`/dashboard/${this.tableName}/editar/${data.row.employeeId}`)
        break;
    
      case "delete":
        if (confirm("Esta Seguro de Continuar").valueOf()) {
          this.cacheService.httpDeleteById(this.tableName, data.row.employeeId).subscribe((res:any) => {
            //console.log(res);
            if (res.firstName) {
              this.dialogPortal.openSuccessDelete(res.firstName)
              this.tableData = this.tableData.filter((row: any) => row.employeeId !== data.row.employeeId);
            }else{
              this.dialogPortal.openError(res)
            }
          });
          break;
        }
        break;
    }
  }

  filterByOrders(){
    const params = {
      tableName: this.tableName,
      filterBy: 'orders',
      //filterData: '1'
    };

    // Navega a la URL con los parámetros
    this.router.navigate(['dashboard/filtro'], { queryParams: params });
    //this.router.navigateByUrl(`/dashboard/filter/${this.tableName}/orders`)
    //this.dialogPortal.openFilterDialog('orders', this.tableName)
  }

  filterByOffice(){
    this.dialogPortal.openFilterDialog('office', this.tableName)
  }

}
