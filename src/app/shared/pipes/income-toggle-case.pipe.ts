import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incomeToggleCase'
})
export class IncomeToggleCasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let tempVal = "";
    for(let i=0;i<value.length;i++){
      if(i==0){
        tempVal += value[i].toUpperCase();
      }else if(value[i] == value[i].toUpperCase()){
        tempVal += " " + value[i];
      }else{
        tempVal += value[i]
      }
    }
    return tempVal;
  }

}
