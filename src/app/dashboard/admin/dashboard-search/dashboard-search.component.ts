import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dashboard-search',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './dashboard-search.component.html',
  styleUrl: './dashboard-search.component.scss'
})
export class DashboardSearchComponent {

  
}
