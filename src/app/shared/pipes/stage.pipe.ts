import { Pipe, PipeTransform } from '@angular/core';
import { StagesEnum } from '../enums/stages.enum';

@Pipe({
  name: 'stage'
})
export class StagePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return StagesEnum[value];
  }

}
