import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simpleFilter',
  standalone:false
})
export class SimpleFilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }

    // return items.filter(item => item.indexOf(filter) !== -1);
    const searchTerm = filter.toLowerCase(); // Convert filter to lowercase
    return items.filter(item => item.toLowerCase().includes(searchTerm));
  }

}
