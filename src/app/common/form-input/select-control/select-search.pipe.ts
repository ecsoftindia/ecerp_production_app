import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectSearch',
  standalone:false
})
export class SelectSearchPipe implements PipeTransform {
  filterItems = [];
  transform(items: any, filter: any, filterName: any, sort: boolean): any {
    if (!filter) {
      if (sort && items) {
        // return items.sort((a: any, b: any) => {
        //   // // console.log(a);
        //   a[filterName].toLowerCase() !== b[filterName].toLowerCase()
        //     ? a[filterName].toLowerCase() < b[filterName].toLowerCase()
        //       ? -1
        //       : 1
        //     : 0;
        // });
        return items.sort((a: any, b: any) =>
          ((a[filterName] ?? '') + '').toLowerCase()
            .localeCompare(((b[filterName] ?? '') + '').toLowerCase())
        );
      } else {
        return items;
      }
    }
    if (items) {
      this.filterItems = items.filter(
        (item: any) =>
          item[filterName].toLowerCase().indexOf(filter.toLowerCase()) > -1
      );
    }
    if (sort) {
      return this.filterItems.sort((a: any, b: any) =>
        a[filterName].toLowerCase() !== b[filterName].toLowerCase()
          ? a[filterName].toLowerCase() < b[filterName].toLowerCase()
            ? -1
            : 1
          : 0
      );
    } else {
      return this.filterItems;
    }
  }
}
