import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DashboardTableComponent } from '../dashboard-table/dashboard-table.component';
import { CacheService } from '../../../services/cache.service';

@Component({
  selector: 'app-dashboard-list',
  standalone: true,
  imports: [
    DashboardTableComponent,
    MatButtonModule,
    MatMenuModule,
    RouterLink, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule
  ],
  templateUrl: './dashboard-list.component.html',
  styleUrl: './dashboard-list.component.scss'
})
export class DashboardListComponent implements OnInit {
  filter = ''

  tableName= ''
  tableHeader=[]
  tableData=''

  activatedRoute = inject(ActivatedRoute);
  cacheService = inject(CacheService);

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(res => {
      const tableName = res.get("tableName")!;
      const filterData = res.get("tableName")!;
      const filterBy = res.get('filterBy')!;

      this.cacheService.httpGetList(tableName, `by${filterBy}/${filterData}`).subscribe(res => {
        console.log(res);
      })
    })
  }

  
}
