import { AfterViewInit, Component, Input, SimpleChanges, ViewChild, OnChanges, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatIconModule],
})
export class DashboardTableComponent implements AfterViewInit, OnChanges {

  @Input() filter!: string;
  @Input() tableName!: string;
  @Input() tableHeader!: string[];
  @Input() tableData!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() actionClicked = new EventEmitter<any>();

  dataSource!: MatTableDataSource<any>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.tableData);
    if (changes['filter']) {
      this.applyFilter(this.filter);
    }
  }

  applyFilter(filterValue: string) {
    if (filterValue) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  onActionClick(row:any, type:string){
    this.actionClicked.emit({row:row, type:type});
  }

  getNestedValue(obj: any, header: string): any {
    try {
      const keys = header.split('.');
      return keys.reduce((acc, key) => acc?.[key], obj);
    } catch (error) {
      return 'null'
    }
   
  }
  
  isActiveCheck(obj: any, header: string){
    const keys = header.split('.');
    const key = keys.reduce((acc, key) => acc?.[key], obj);
    switch (key?.toString().toLowerCase()) {
      case 'entregado':
        return 'rounded-2 text-bg-success p-1'
      case 'true':
        return 'rounded-2 text-bg-success p-1'

      case 'false':
        return 'rounded-2 text-bg-warning p-1'

      case 'pendiente':
        return 'rounded-2 text-bg-warning p-1'

      default:
        return ''    }
  }


}
