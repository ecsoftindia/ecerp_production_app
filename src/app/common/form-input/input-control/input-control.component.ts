import { Component, OnInit, Optional, Self } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FromInputControl } from '../form-input-control';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
  standalone:false
})
export class InputControlComponent extends FromInputControl implements OnInit {
  // for input & output check form input control
  constructor(@Self() @Optional() public control: NgControl) {
    super();
    this.control && (this.control.valueAccessor = this);

    // // console.log(error);
  }

  ngOnInit(): void {
    this.setValidate(this.control);
  }
}
