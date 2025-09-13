import { Component, HostListener, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FromInputControl } from '../form-input-control';

@Component({
  selector: 'app-pin-control',
  templateUrl: './pin-control.component.html',
  styleUrls: ['./pin-control.component.scss'],
  standalone:false
})
export class PinControlComponent extends FromInputControl implements OnInit {
  // for input & output check form input control
  xvalue = "";
  constructor(
    @Self() @Optional() public control: NgControl
  ) {
    super();
    this.control && (this.control.valueAccessor = this);
  }

  ngOnInit(): void {
    this.setValidate(this.control);

    this.viewValueChange().subscribe(async (xvalue) => {
      if (xvalue) {
        if (this.value) {
          let nValue = this.value.toString();
          this.xvalue = nValue.match(/.{1,2}/g)?.join('-') || '';
        } else {
          this.xvalue = "";
        }
      }
    });
  }

  onKeyUp(event: any) {
    // Get the input value and remove any non-numeric characters
    let inputVal = event.target.value.replace(/\D/g, '');

    // Split the value into groups of 2 digits and join with dashes
    inputVal = inputVal.match(/.{1,1}/g)?.join('-') || '';
    // console.log(inputVal);

    // Limit the value to 6 characters
    inputVal = inputVal.slice(0, 11);

    // Set the masked value back into the input
    event.target.value = inputVal;
    // this.xvalue = inputVal;
    this.value = inputVal.replace(/-/g, "");
  }



}
