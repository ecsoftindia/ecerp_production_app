import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FromInputControl } from '../form-input-control';

@Component({
  selector: 'app-textarea-control',
  templateUrl: './textarea-control.component.html',
  styleUrls: ['./textarea-control.component.scss'],
  standalone:false
})
export class TextareaControlComponent extends FromInputControl implements OnInit {
  @Input() public className = "";

  constructor(
    @Self() @Optional() public control: NgControl
  ) {
    super();
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.control) {
      this.setValidate(this.control);
    }
  }

}
