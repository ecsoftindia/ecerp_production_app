import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[autofocus]",
  standalone:false
})
export class AutofocusDirective {
  @Input() autofocus = false;
  constructor(private host: ElementRef) { }

  ngAfterViewInit() {
    if (this.autofocus) {
      setTimeout(() => {
        this.host.nativeElement.focus();
      }, 200);
      
    }
  }
}
