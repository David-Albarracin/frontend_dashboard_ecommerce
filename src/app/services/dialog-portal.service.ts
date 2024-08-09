import { Injectable, inject } from '@angular/core';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DashboardNotificationsComponent } from '../dashboard/admin/dashboard-notifications/dashboard-notifications.component';
import { DashboardOrdersDetailsComponent } from '../dashboard/admin/orders-details/dashboard-orders-details/dashboard-orders-details.component';

@Injectable({
  providedIn: 'root'
})
export class DialogPortalService {

  dialog = inject(MatDialog)

  constructor(

  ) { }



  openError(err: any) {
    this.dialog.open(ErrorDialogComponent, {
      width: '350px',
      data: { type:"error", message: 'An error occurred: ' + err.message }
    })
  }

  openSuccess(res:any){
    this.dialog.open(ErrorDialogComponent, {
      width: '350px',
      data: { type:"success", message: `Se creo o se actualizo ${res} Correctamente`}
    })
  }

  openFilterDialog(typeSelect:string, tableName: string){
    this.dialog.open(DashboardNotificationsComponent, {
      width: '350px',
      data: { typeSelect:typeSelect, tableName:tableName}
    })
  }


  openOrderDetail(){
    return this.dialog.open(DashboardOrdersDetailsComponent, {
      width: '350px',
      //data: { typeSelect:typeSelect, tableName:tableName}
    })
  }


}
