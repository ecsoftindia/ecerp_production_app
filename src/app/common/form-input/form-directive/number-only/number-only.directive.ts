import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";

@Directive({
  selector: "[ngModel][appNumberOnly]",
  standalone:false
})
export class NumberOnlyDirective implements AfterViewInit {
  @Input("decimal") decimal: any = 0;
  @Input("limit") limit: any = -1;
  @Input("min") min: any = -1;
  @Input("max") max: any = -1;
  regex = /[^\d,.]+/g;
  value: any = "";
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    // // console.log(this.decimal);
    if (this.decimal === 0) {
      this.regex = /[^\d]+/g;
    }
  }

  @HostListener("input", ["$event"]) onInputChange($event: any) {
    // // console.log(this.decimal);
    let xvalue = $event.target.value.toString();
    let rvalue = xvalue.replace(this.regex, "");

    // On Limit Set
    if (this.limit > 0) {
      rvalue.length > this.limit
        ? (rvalue = rvalue.substring(0, this.limit))
        : "";
    }

    // decimal set
    if (this.decimal > 0) {
      const arr = rvalue.split(".");
      let dvalue = "";
      if (arr.length > 1) {
        let afterDecimal = arr[1].substring(0, this.decimal);
        dvalue = dvalue + arr[0] + "." + afterDecimal;
      }
      if (dvalue !== "") {
        rvalue = dvalue;
      }
    }

    // max number check
    if (this.max > 0) {
      // // console.log(rvalue);
      parseFloat(rvalue) > this.max
        ? (rvalue = rvalue.substring(0, rvalue.length - 1))
        : "";
    }

    $event.target.value = rvalue;
    this.ngModelChange.emit(rvalue);
  }
}
