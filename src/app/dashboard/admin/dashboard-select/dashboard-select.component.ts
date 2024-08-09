import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {AbstractControl, FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
  fb = inject(FormBuilder)

  @Input() selectConfig!:{
    dataId: any,
    dataName: string[],
    tableName: string
  }

  @Input() dataSelected!: any;
  //@Input() dataSelectedByName: any;

  @Output() selectChanges = new EventEmitter<any>();

  selectData:any;

  formSelect = this.fb.group({
    onSelect: [] // Default value can be set to null or a default object
  });
  //objectSelect:any
  

  selectChange(){    
    this.selectChanges.emit(this.formSelect.get("onSelect")?.value);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectConfig']) {
      switch (this.selectConfig.tableName) {
        case "order-type":
          this.selectData = [{name:"COMPRA", orderTypeId:"COMPRA"}, {name:"VENTA", orderTypeId:"VENTA"}]
          break;
        case "document-type":
          this.selectData = [
            { documentTypeId: 'CEDULA_CIUDADANIA', name: 'CEDULA_CIUDADANIA' },
            { documentTypeId: 'CEDULA_EXTRANJERIA', name: 'CEDULA_EXTRANJERIA' },
            { documentTypeId: 'NIT', name: 'NIT' },
            { documentTypeId: 'PASAPORTE', name: 'PASAPORTE' }
        ];
          break;
      
        default:
          this.cacheService.httpGetList(this.selectConfig.tableName).subscribe((res) => {        
            this.selectData = res;
            //console.log(res);
            
          })
          break;
      }

    }
    if (changes['dataSelected']) {
      this.formSelect.get("onSelect")?.setValue(this.dataSelected)
      //console.log(this.dataSelected);
    }
  }
  
  objectComparisonFunction = ( option:any, value:any ) : boolean => {
    const valueData = value? value[this.selectConfig.dataId]: '';
    if (valueData) {
      return option[this.selectConfig.dataId] === value[this.selectConfig.dataId];
    }
    return option[this.selectConfig.dataId] === value;

  }
}
