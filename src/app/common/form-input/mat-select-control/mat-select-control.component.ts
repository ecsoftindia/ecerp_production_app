import { ChangeDetectorRef, Component, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FromInputControl } from '../form-input-control';

@Component({
  selector: 'app-mat-select-control',
  templateUrl: './mat-select-control.component.html',
  styleUrls: ['./mat-select-control.component.scss'],
  standalone:false
})
export class MatSelectControlComponent extends FromInputControl implements OnInit {
// @Input() public items = [];
@Input() public key: string = '';
@Input() public keyname: string = '';
@Input() public placeholderLabel: string = '';
@Input() public sort: boolean = true;
@Input() public clearIcon: boolean = true;
@Input() types = "";
@Input() customer ="";
itemsNow = [];
@Input()
set items(items: any) {
  console.log(items)
  this.itemsNow = items || [];
  //console.log(items);
  if (items) {
    if (items.length > 4) {
      this.search = true;
    }
  }
}
get items() {
  return this.itemsNow;
}

searchItem = '';
constructor(
  @Self() @Optional() public control: NgControl,
  private cdf: ChangeDetectorRef
) {
  super();
  this.control && (this.control.valueAccessor = this);

  // this.control && (this.control.valueAccessor = this);
}

ngOnInit(): void {
  this.setValidate(this.control);
  // console.log(this.search);
  this.cdf.detectChanges();
  console.log(this.types)
  console.log(this.customer)
  console.log(this.itemsNow)
}

}
