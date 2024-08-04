import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardSearchComponent } from '../dashboard-search/dashboard-search.component';
import { MatDrawer } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    DashboardSearchComponent,
    MatMenuModule
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent {

  @Input() drawer!: MatDrawer;

  authService = inject(AuthService);

  toggleDrawer() {
    this.drawer.toggle();
  }

  logout(){
    this.authService.logout();
  }

}
