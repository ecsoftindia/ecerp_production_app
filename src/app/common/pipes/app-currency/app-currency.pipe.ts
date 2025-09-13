import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from '../../config/app.config';

@Pipe({
  name: 'appCurrency',
  standalone:false
})
export class AppCurrencyPipe implements PipeTransform {
  currencyCode = AppConfig.baseCurrency;
  constructor(
    private currencyPipe: CurrencyPipe
  ){

  }
  transform(value: any): any {
    if(!value){
      return '';
    }
    const xValue = this.currencyPipe.transform(value, this.currencyCode);
    return xValue;
  }
}
