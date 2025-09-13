import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tinView',
  standalone:false
})
export class TinViewPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return "";
    }
    let val = value.toString();
    val = val.replace(/\D/g, '');
    val = val.replace(/^(\d{2})/, '$1-');
    val = val.replace(/^(\d{2})-(\d{5})/, '$1-$2-');
    val = val.replace(/^(\d{2})-(\d{5})-(\d{1})/, '$1-$2-$3-');
    val = val.replace(/^(\d{2})-(\d{5})-(\d{1})-(\d{1}).*/, '$1-$2-$3-$4');
    return val;
  }

}
