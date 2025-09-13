import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditionIfDirective } from './edition-if.directive';

@NgModule({
  declarations: [
    EditionIfDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EditionIfDirective
  ]
})
export class EditionIfModule { }
