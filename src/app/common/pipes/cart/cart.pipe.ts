import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cart',
  standalone:false
})
export class CartPipe implements PipeTransform {

  transform(value: string, items: any): any {
    if(!value){
      return -1;
    }
    if(!items) {
      return -1;
    }

    let index = items.map((e: any)=>e.ic).indexOf(value);
    return index;
  }

}
