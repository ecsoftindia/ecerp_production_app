import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vinView',
  standalone:false
})
export class VinViewPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return "";
    }
    let val = value.toString();
    val = val.replace(/\D/g, '');
    val = val.replace(/^(\d{4})/, '$1-');
    val = val.replace(/^(\d{4})-(\d{3})/, '$1-$2-');
    val = val.replace(/^(\d{4})-(\d{3})-(\d{5}).*/, '$1-$2-$3');
    return val;
  }

}
