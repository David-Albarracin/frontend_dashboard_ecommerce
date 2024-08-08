import { Component } from '@angular/core';
import { OrderDetail } from '../../../../models/ecommerceModels';

@Component({
  selector: 'app-dashboard-orders-details-list',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-orders-details-list.component.html',
  styleUrl: './dashboard-orders-details-list.component.scss'
})
export class DashboardOrdersDetailsListComponent {

  order:OrderDetail[] = []

}
