import { Component, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FromInputControl } from '../form-input-control';

@Component({
  selector: 'app-password-control',
  templateUrl: './password-control.component.html',
  styleUrls: ['./password-control.component.scss'],
  standalone:false
})
export class PasswordControlComponent extends FromInputControl implements OnInit {
  type = "password";
  hide = true;
  // for input & output check form input control

  constructor(
    @Self() @Optional() public control: NgControl
  ) {
    super();
    this.control && (this.control.valueAccessor = this);

  }

  ngOnInit(): void {
    this.setValidate(this.control);
  }

  toggleType() {
    if (this.hide) {
      this.hide = false; this.type = "text"
    } else {
      this.hide = true; this.type = "password"
    }
  }

}
