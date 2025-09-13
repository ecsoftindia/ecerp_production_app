import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

import { FromInputControl } from '../form-input-control';

@Component({
  selector: 'app-counter-control',
  templateUrl: './counter-control.component.html',
  styleUrls: ['./counter-control.component.scss'],
  standalone:false
})
export class CounterControlComponent extends FromInputControl implements OnInit {
  // @Input() stockAvailability: number = 0;
  itemQnty: any = "";
  constructor(
    @Self() @Optional() public control: NgControl,
    
    ) {
    super();
    this.control && (this.control.valueAccessor = this);

    // // console.log(error);
  }

  ngOnInit(): void {
    this.setValidate(this.control);
  }

  adjustQty(val: any){
    let value = parseFloat(this.value);
    if(val === -1 && value === 0){
        return;
    }
    value = value + val;
    this.value = value.toString();
    this.doChange(this.value);

  }


  // adjustQty(val: any) {
  //   let value = parseFloat(this.value);
  //   if (val === -1 && value === 0) {
  //     return;
  //   }
    
  //   value = value + val;
  
  //   // Check if the updated quantity exceeds the stock availability
  //   if (this.itemQnty >= this.stockAvailability) {
  //     return; // Do not update the quantity if it exceeds stock availability
  //   }
  
  //   this.value = value.toString();
  //   this.doChange(this.value);
  // }


  // adjustQty(quantity: number) {
  //   console.log(this.itemQnty ,  this.stockAvailability)
  //   if (quantity > 0 || (quantity < 0 && this.itemQnty > 0)) {
  //     const updatedQuantity = Number(this.itemQnty) + quantity;

  //     if (this.stockAvailability && updatedQuantity > this.stockAvailability) {
  //       return; // Do not update the quantity if it exceeds stock availability
  //     }

  //     this.itemQnty = updatedQuantity.toString();
  //   }
  // }

}
