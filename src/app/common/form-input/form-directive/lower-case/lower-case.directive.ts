import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngModel][appLowerCase]',
  standalone:false
})
export class LowerCaseDirective {

  @Input() appLowerCase = false;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  @HostListener('input', ['$event']) onInputChange($event: any) {
    // // console.log($event);
    if (this.appLowerCase) {
      this.value = $event.target.value.toLowerCase();
      this.ngModelChange.emit(this.value);
    }
  }
}
