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
  selector: 'app-dashboard-office-list',
  standalone: true,
  imports: [DashboardTableComponent, MatButtonModule, MatMenuModule, RouterLink, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './dashboard-office-list.component.html',
  styleUrl: './dashboard-office-list.component.scss'
})
export class DashboardOfficeListComponent implements OnInit{

  filter = ''

  cacheService = inject(CacheService);
  router = inject(Router);
  dialogPortal = inject(DialogPortalService);

  tableName= "oficinas"

  tableHeader=[
    "officeId",
    "addressLine1",
    "addressLine2",
    "city.name",
    "city.region.name"
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
        this.router.navigateByUrl(`/dashboard/${this.tableName}/editar/${data.row.officeId}`)
        break;
    
      case "delete":
        if (confirm("Esta Seguro de Continuar").valueOf()) {
          this.cacheService.httpDeleteById(this.tableName, data.row.officeId).subscribe((res:any) => {
            //console.log(res);
            if (res.officeId) {
              this.dialogPortal.openSuccessDelete(res.officeId)
              this.tableData = this.tableData.filter((row: any) => row.officeId !== data.row.officeId);
            }else{
              this.dialogPortal.openError(res)
            }
          });
          break;
        }
    }
  }

}
