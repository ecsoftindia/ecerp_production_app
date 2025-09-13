import { Component, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FromInputControl } from '../form-input-control';

@Component({
  selector: 'app-email-control',
  templateUrl: './email-control.component.html',
  styleUrls: ['./email-control.component.scss'],
  standalone:false
})
export class EmailControlComponent extends FromInputControl implements OnInit {

  constructor(
    @Self() @Optional() public control: NgControl
  ) {
    super();
    this.control && (this.control.valueAccessor = this);
  }

  ngOnInit(): void {
    this.email = true;
    this.setValidate(this.control);
  }

  onInputChange(event: any): void {
    const input = event.target as HTMLInputElement;
    let sanitizedValue = input.value.replace(/[^@a-zA-Z0-9.]/g, ''); // Remove characters other than "@", letters, and numbers
    input.value = sanitizedValue; // Update the input value
    this.value = sanitizedValue; // Update the component property bound with ngModel
  }
}
