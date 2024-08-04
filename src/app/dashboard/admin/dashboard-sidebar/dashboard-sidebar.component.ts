import { Component, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CacheService } from '../../../services/cache.service';



@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [ MatToolbarModule, MatListModule, CdkAccordionModule, RouterLink, MatIconModule],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.scss'
})
export class DashboardSidebarComponent {
  showFiller = false;

  cacheService = inject(CacheService)

  get menu(){
    return this.cacheService.menu;
  }

}
