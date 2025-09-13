import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iszero',
  standalone:false
})
export class IszeroPipe implements PipeTransform {

  transform(value: any): boolean {
    if(!value){
      return false;
    }
    let rvalue = parseFloat(value);
    return rvalue === 0 ? true: false;
  }

}
