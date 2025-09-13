import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appSelectSearch',
  standalone:false
})
export class AppSelectSearchPipe implements PipeTransform {
  keyname: any;

  transform(
    items: any,
    filter: any,
    filtername: any,
    defaultFilter?: boolean
  ): any {
    if (!filter) {
      return items;
    }
    return items.filter(
      (item: any) =>
        item[filtername].toLowerCase().indexOf(filter.toLowerCase()) > -1
    );
  }
}
