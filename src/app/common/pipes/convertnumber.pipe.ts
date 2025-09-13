import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertnumber',
  standalone:false
})
export class ConvertnumberPipe implements PipeTransform {

  transform(value: string): any {
    const num = parseFloat(value);
    return num;
  }
}
