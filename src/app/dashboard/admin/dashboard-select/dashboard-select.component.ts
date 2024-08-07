import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {AbstractControl, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CacheService } from '../../../services/cache.service';

@Component({
  selector: 'app-dashboard-select',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard-select.component.html',
  styleUrl: './dashboard-select.component.scss'
})
export class DashboardSelectComponent implements OnChanges {

  cacheService = inject(CacheService)

  @Input() selectConfig!:{
    dataId:string,
    dataName: string,
    tableName: string
  }

  @Input() dataSelected!: any;
  //@Input() dataSelectedByName: any;

  @Output() selectChanges = new EventEmitter<any>();

  selectData:any;

  onSelect = new FormControl();


  selectChange(){    
    this.selectChanges.emit(this.onSelect.value);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectConfig']) {
      switch (this.selectConfig.tableName) {
        case "order-type":
          this.selectData = [{name:"COMPRA", orderTypeId:"COMPRA"}, {name:"VENTA", orderTypeId:"VENTA"}]
          break;
      
      
        default:
          this.cacheService.httpGetList(this.selectConfig.tableName).subscribe((res) => {        
            this.selectData = res;
          })
          break;
      }

    }
    if (changes['dataSelected']) {
      this.onSelect = new FormControl(this.dataSelected);
    }
  }
  

}
