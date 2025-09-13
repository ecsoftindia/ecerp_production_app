import { Pipe, PipeTransform } from '@angular/core';

export class FormErrorMessage {
    public static required = "Mandatory";
    public static pattern = "Invalid value";
    public static min = "minimum ${min} required";
}

@Pipe({
    name: 'appFormError',
    standalone:false
})
export class AppFormErrorPipe implements PipeTransform {
    transform(error: any, defaultErrorText: string) {
        // // console.log(error);
        if (defaultErrorText !== "") { return defaultErrorText; }
        if (error.required) { return FormErrorMessage.required; };
        if (error.min) {
            let message = FormErrorMessage.min;
            message = message.replace('${min}', error.min.min);
            return message;
        };
        if (error.pattern) {
            // // console.log(error.pattern);
            if (error.pattern.requiredPattern === '/^[1-9][0-9]*$/') {
                return FormErrorMessage.required;
            } else {
                return FormErrorMessage.pattern;
            }
        }
        return FormErrorMessage.required;
    }

}