import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleFilterPipe } from './simple-filter/simple-filter.pipe';
// import { AppDatePipe } from './app-date/app-date.pipe';
// import { AppCurrencyPipe } from './app-currency/app-currency.pipe';
import { AppSafePipe } from './app-safe/app-safe.pipe';
// import { AppFilterPipe } from './app-filter/app-filter.pipe';
// import { AppSelectSearchPipe } from './app-select-search/app-select-search.pipe';
// import { EmailMaskPipe } from './email-mask.pipe';
// import { TinViewPipe } from './tin-view/tin-view.pipe';
// import { VinViewPipe } from './vin-view/vin-view.pipe';
// import { IszeroPipe } from './iszero/iszero.pipe';
// import { CartPipe } from './cart/cart.pipe';
// import { ConvertnumberPipe } from './convertnumber.pipe';
// import { ItemStockPipe } from './item-stock/item-stock.pipe';

@NgModule({
  declarations: [
    // AppDatePipe,
    // AppCurrencyPipe,
    AppSafePipe,
    // AppFilterPipe,
    // AppSelectSearchPipe,
    // EmailMaskPipe,
    // TinViewPipe,
    // VinViewPipe,
    // IszeroPipe,
    // CartPipe,
    // ConvertnumberPipe,
    // ItemStockPipe
    SimpleFilterPipe
  ],
  imports: [CommonModule],
  // providers: [CurrencyPipe, AppFilterPipe, CartPipe],
  exports: [
    // AppDatePipe,
    // AppCurrencyPipe,
    AppSafePipe,
    // AppSelectSearchPipe,
    // AppFilterPipe,
    // EmailMaskPipe,
    // TinViewPipe,
    // VinViewPipe,
    // IszeroPipe,
    // CartPipe,
    // ConvertnumberPipe,
    // ItemStockPipe
    SimpleFilterPipe
  ],
})
export class PipesModule { }
