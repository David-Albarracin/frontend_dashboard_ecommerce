import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { OrderDetail } from '../../../../models/ecommerceModels';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogPortalService } from '../../../../services/dialog-portal.service';

@Component({
  selector: 'app-dashboard-orders-details-list',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './dashboard-orders-details-list.component.html',
  styleUrl: './dashboard-orders-details-list.component.scss'
})
export class DashboardOrdersDetailsListComponent {

  @Input() orderDetail!:OrderDetail[] | undefined

  @Output() actionClicked = new EventEmitter<any>();


  dialogPortal = inject(DialogPortalService)

  addProduct(){
    this.dialogPortal.openOrderDetail().afterClosed().subscribe(result => {
      //console.log(result.value);
      if (result?.value) {
        this.actionClicked.emit(result.value);
      }
    })
    //console.log(dialog);
    
  }

  onActionClick(){
    //this.actionClicked.emit({row:row, type:type});
  }

}
