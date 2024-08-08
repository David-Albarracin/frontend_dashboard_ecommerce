import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DashboardSelectComponent } from "../dashboard-select/dashboard-select.component";
import { CacheService } from '../../../services/cache.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-notifications',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, DashboardSelectComponent],
  templateUrl: './dashboard-notifications.component.html',
  styleUrl: './dashboard-notifications.component.scss'
})
export class DashboardNotificationsComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DashboardNotificationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { typeSelect:string, tableName:string }
  ) { }

  title!:string

  selectConfigData!:{ dataId: string; dataName: string; tableName: string; }

  selectData!:string

  router = inject(Router);
  //cacheService = inject(CacheService);

  
  ngOnInit(): void {
    
    switch (this.data.typeSelect) {
      case "city":
        this.selectConfigData = {
          dataId: 'cityId',
          dataName: 'name',
          tableName: 'ciudades'
        }
        this.title = `Buscar ${this.data.tableName} por ciudades`
        break;

       case "status":

        this.selectConfigData = {
          dataId: 'orderStatusId',
          dataName: 'name',
          tableName: 'estados'
        }
        this.title =  `Buscar ${this.data.tableName} por estado de pedidos`
        break;
    
      default:
        break;
    }

  
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onFilter(){
    if (this.selectData) {
      const tableName = encodeURIComponent(this.data.tableName);
      const filterBy = encodeURIComponent(this.data.typeSelect);
      const filterData = encodeURIComponent(this.selectData);

      // Navegar con parámetros de consulta
      this.router.navigate(['/dashboard/filtro'], {
        queryParams: {
          tableName: tableName,
          filterBy: filterBy,
          filterData: filterData
        }
      });

      // Cerrar el diálogo y pasar datos de retorno
      this.dialogRef.close(this.selectData);
    }
  }

  handleSelectChange(data:any){
    this.selectData = data    
  }
}
