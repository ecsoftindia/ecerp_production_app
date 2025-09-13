import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FromInputControl } from '../form-input-control';

@Component({
  selector: 'app-number-control',
  templateUrl: './number-control.component.html',
  styleUrls: ['./number-control.component.scss'],
  standalone:false
})
export class NumberControlComponent extends FromInputControl implements OnInit {

  // for input & output check form input control
  @Input() public override decimal: any = 9;
  constructor(
    @Self() @Optional() public control: NgControl
  ) {
    super();
    this.control && (this.control.valueAccessor = this);
  }

  ngOnInit(): void {
    this.setValidate(this.control);
  }

 
  
}
