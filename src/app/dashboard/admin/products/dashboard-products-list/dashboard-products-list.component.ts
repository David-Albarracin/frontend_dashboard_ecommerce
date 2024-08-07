import { Component, inject, OnInit } from '@angular/core';
import { DashboardTableComponent } from "../../dashboard-table/dashboard-table.component";
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CacheService } from '../../../../services/cache.service';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-dashboard-products-list',
  standalone: true,
  imports: [DashboardTableComponent, MatButtonModule, MatMenuModule, RouterLink, MatIconModule, MatFormFieldModule, MatInputModule, MatChipsModule],
  templateUrl: './dashboard-products-list.component.html',
  styleUrl: './dashboard-products-list.component.scss'
})
export class DashboardProductsListComponent implements OnInit{

  mainTableData=[]

  filter = ''

  filterGama:string[] = []

  cacheService = inject(CacheService);
  router = inject(Router);

  tableName= "productos"

  tableHeader=[
    "productId",
    "code",
    "name",
    "stock",
    "productGama"
  ]

  tableData=[]
  gamas:any[]=[]

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.filter = filterValue;
  }

  ngOnInit(): void {
    this.cacheService.httpGetList(this.tableName).subscribe((res:any) => {
      this.tableData = res.map((item:any) => {
        return {
          ...item,
          productGama: item.productGama? item.productGama.name : null
        };
      });
      this.mainTableData = this.tableData 
    });
    
    this.cacheService.httpGetList("gamas").subscribe(res => {
      this.gamas = res;
    });
  }

  handleActionClick(data: any): void {
    switch (data.type) {
      case "edit":
        this.router.navigateByUrl(`/dashboard/${this.tableName}/editar/${data.row.productId}`)
        break;
    
      case "delete":
        this.cacheService.httpDeleteById(this.tableName, data.row.productId).subscribe(res => {
          console.log(res);
          
        });
        break;
    }
  }

  // Aplicar filtro por gama
  filterByGama(gama: string) {
    if (!this.filterGama.includes(gama)) {
      this.filterGama.push(gama);
      this.updateTableData();
    }
  }

  // Eliminar filtro
  removeFilter(gama: string) {
    this.filterGama = this.filterGama.filter(f => f !== gama);
    this.updateTableData();
  }

  // Actualiza los datos de la tabla basados en los filtros
  updateTableData() {
    if (this.filterGama.length === 0) {
      this.tableData = this.mainTableData; // Sin filtros aplicados
    } else {
      this.tableData = this.mainTableData
        .filter((item: any) => this.filterGama.includes(item.productGama));
    }
  }

  filterLowStock(){
    this.tableData = [...this.mainTableData].sort((a: any, b: any) => a.stock - b.stock);
  }

}
