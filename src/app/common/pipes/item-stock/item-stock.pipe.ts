import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemStock',
  standalone:false
})
export class ItemStockPipe implements PipeTransform {

  transform(item: any): any {
    if (!item) {
      return "";
    }
    if (item.ispaused === 'YES') {
      return 'Paused';
    }

    if (item.stkchk === 'YES') {
      if (parseFloat(item.currentstock) > 0) {
        return 'Show';
      } else {
        return 'NoStock';
      }
    }

    if (item.stkchk === 'NO') {
      if (item.instock === 'YES') {
        return 'Show';
      } else {
        return 'NoStock'
      }
    }
    return "";
  }


  // <ng-container *ngIf="item.ispaused === 'NO' else notAvailable">
  //   <ng-container *ngIf="item.stkchk === 'YES'">
  //     <ng-container *ngIf="(item.currentstock | convertnumber) > 0 else outOfStock">
  //       <ng-container *ngTemplateOutlet="notaGroupPriceBand"></ng-container>
  //     </ng-container>
  //   </ng-container>
  //   <ng-container *ngIf="item.stkchk === 'NO'">
  //     <ng-container *ngIf="item.instock === 'YES' else outOfStock">
  //       <ng-container *ngTemplateOutlet="notaGroupPriceBand"></ng-container>
  //     </ng-container>
  //   </ng-container>
  // </ng-container>

}
