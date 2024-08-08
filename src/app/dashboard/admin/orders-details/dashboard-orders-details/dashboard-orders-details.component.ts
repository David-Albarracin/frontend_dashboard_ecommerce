import { Component, Input } from '@angular/core';
import { OrderDetail } from '../../../../models/ecommerceModels';

@Component({
  selector: 'app-dashboard-orders-details',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-orders-details.component.html',
  styleUrl: './dashboard-orders-details.component.scss'
})
export class DashboardOrdersDetailsComponent {

  @Input() orderDetail!:OrderDetail

}
