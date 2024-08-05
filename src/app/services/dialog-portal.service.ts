import { Injectable, inject } from '@angular/core';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogPortalService {

  dialog = inject(MatDialog)

  constructor(

  ) { }



  openError(err: any) {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: { type:"error", message: 'An error occurred: ' + err.message }
    })
  }

  openSuccess(res:any){
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: { type:"success", message: `Se creo ${res} Correctamente`}
    })
  }



}
