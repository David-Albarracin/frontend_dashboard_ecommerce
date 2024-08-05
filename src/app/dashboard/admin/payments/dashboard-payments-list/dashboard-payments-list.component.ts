import { Component, inject, OnInit } from '@angular/core';
import { DashboardTableComponent } from "../../dashboard-table/dashboard-table.component";
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CacheService } from '../../../../services/cache.service';

@Component({
  selector: 'app-dashboard-payments-list',
  standalone: true,
  imports: [DashboardTableComponent, MatButtonModule, MatMenuModule, RouterLink, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './dashboard-payments-list.component.html',
  styleUrl: './dashboard-payments-list.component.scss'

})
export class DashboardPaymentsListComponent implements OnInit{

  filter = ''

  cacheService = inject(CacheService);
  router = inject(Router);

  tableName= "pagos"

  tableHeader=[
    "id",
    "username"
  ]

  tableData=[]
  gamas:any[]=[]

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.filter = filterValue;
  }

  ngOnInit(): void {
    this.cacheService.httpGetList(this.tableName).subscribe(res => {
      this.tableData = res;
    });
    // this.cacheService.httpGetList("gamas").subscribe(res => {
    //   this.gamas = res;
    // });
  }

  handleActionClick(data: any): void {
    switch (data.type) {
      case "edit":
        this.router.navigateByUrl(`/dashboard/${this.tableName}/editar/${data.row.id}`)
        break;
    
      case "delete":
        this.cacheService.httpDeleteById(this.tableName, data.row.id).subscribe(res => {
          console.log(res);
          
        });
        break;
    }
  }

}