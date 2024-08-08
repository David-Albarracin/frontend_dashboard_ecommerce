import { Injectable, inject } from '@angular/core';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DashboardNotificationsComponent } from '../dashboard/admin/dashboard-notifications/dashboard-notifications.component';

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



}
