import { Directive, ElementRef, EventEmitter, Input, Optional, Output, Self, ViewChild } from "@angular/core";
import { NgControl, Validators } from "@angular/forms";
import { FormAccessorBase } from "./form-accessor-base";

@Directive()

export class FromInputControl extends FormAccessorBase {
    // Core Input
    @Input() name = "";
    @Input() placeholder = "";
    @Input() label = "";
    @Input() login: boolean = false;
    @Input() multiple: boolean = false;
    @Input() upperCase = false;
    @Input() lowerCase = false;
    @Input() search = false;
    @Input() required = false;
    @Input() autofocus = false;
    @Input() email = false;

    // Applicable only number input
    // @Input() public limit = -1;
    @Input() public decimal = 0;
    @Input() public max = -1;
    @Input() public min = -1;
    @Input() public minlength = -1;
    @Input() public maxlength = -1;

    @Input() public valuetype: string = '';

    errorTrueNow = false;

    @Input()
    set errorTrue(errorTrue: boolean) {
        this.errorTrueNow = errorTrue || false;
    }
    get errorTrue() {
        return this.errorTrueNow;
    }

    btnClickedNow = false;
    @Input()
    set btnClicked(btnClicked: boolean) {
        this.btnClickedNow = btnClicked || false;
    }
    get btnClicked() {
        return this.btnClickedNow;
    }

    errorTextNow = '';

    @Input()
    set errorText(errorText: string) {
        this.errorTextNow = errorText || '';
    }
    get errorText() {
        return this.errorTextNow;
    }



    @Output('clear') clear: EventEmitter<any> = new EventEmitter();

    onClear() {
        this.value = '';
        this.clear.next(true);
    }
    onClearMultiple(){
        this.value = [];
        this.clear.next(true);
    }

    @Output('onBlur') onBlur: EventEmitter<any> = new EventEmitter();

    doBlur() {
        this.onBlur.next(this.value);
    }

    @Output('onFocus') onFocus: EventEmitter<any> = new EventEmitter();

    doFocus() {
        this.onFocus.next(this.value);
    }

    @Output('onKeyPress') onKeyPress: EventEmitter<any> = new EventEmitter();

    KeyPress() {
        this.onKeyPress.next(this.value);
    }

    @Output('onEnter') onEnter: EventEmitter<any> = new EventEmitter();
    checkEnter(event: any) {
        if (event.key === 'Enter') {
            this.onEnter.next(this.value);
        }
    }

    @ViewChild('forminput', { static: false }) forminput!: ElementRef;
    setFocus() {
        this.forminput.nativeElement.focus();
        this.forminput.nativeElement.select();
    }

    @Output('onSearch') onSearch: EventEmitter<any> = new EventEmitter();

    doSearch() {
        this.onSearch.next(this.value);
    }

    @Output('change') change: EventEmitter<any> = new EventEmitter();

    doChange(event: any) {
        this.change.next(event);
    }

    setValidate(control: NgControl) {
        let validation = [];
        if (this.required) {
            validation.push(Validators.required);
        }
        if (this.email) {
            validation.push(Validators.email);
        }
        if (this.valuetype === 'int') {
            let pattern = /^[1-9][0-9]*$/;
            validation.push(Validators.pattern(pattern));
        }
        if (this.min > -1) {
            validation.push(Validators.min(this.min));
        }
        if (this.max > -1) {
            validation.push(Validators.max(this.max));
        }
        if (this.minlength > -1) {
            validation.push(Validators.minLength(this.minlength));
        }
        if (this.maxlength > -1) {
            validation.push(Validators.maxLength(this.maxlength));
        }


        control?.control?.setValidators(validation);
        control?.control?.updateValueAndValidity();
        // // console.log(control);
    }

}