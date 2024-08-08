import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  tableHeader!:string[]
  tableData:any

  actions!:boolean;

  activatedRoute = inject(ActivatedRoute);
  cacheService = inject(CacheService);
  router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(res => {
      const tableName = res.get("tableName")!;
      const filterData = res.get("filterData")!;
      const filterBy = res.get('filterBy')!;

      this.tableName = tableName;


      this.cacheService.httpGetList(tableName, `by${filterBy}/${filterData}`).subscribe(res => {
        this.tableData = res;
        this.actions = true;

        if (tableName == 'clientes') {
          this.tableHeader = [
            "customerId",
            "firstName",
            "employee.firstName",
          ]
          if (filterBy == 'city' ) {
           
            this.actions = true;
            this.tableHeader.push('addresses.city.name');
      
            this.tableData = this.tableData.map((item:any) => {
              
              if (item.addresses && item.addresses.length > 0) {
               
                return { ...item, addresses: item.addresses[0] };
              }
              return item;
            });
          }else if(filterBy == 'status'){
            console.log(res);
            
          }
        
        }
        if (tableName == 'pedidos') {
          console.log(res);
          
          this.tableHeader = [
            "orderId",
            "orderDate",
            "status.name",
            "orderType"
          ]

          this.actions = true;

        }
          
      });
      
    })
  }


  handleActionClick(data: any): void {
    switch (data.type) {
      case "edit":
        this.router.navigateByUrl(`/dashboard/${this.tableName}/editar/${data.row[this.tableHeader[0]]}`)
        break;
    
      case "delete":
        this.cacheService.httpDeleteById(this.tableName, data.row[this.tableHeader[0]]).subscribe(res => {
          console.log(res);
          
        });
        break;
    }
  }

  
}
