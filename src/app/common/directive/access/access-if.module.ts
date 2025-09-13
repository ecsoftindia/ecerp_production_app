import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessIfDirective } from './access-if.directive';
// import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AccessIfDirective,
    // AccessDeniedComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    AccessIfDirective,
    // AccessDeniedComponent,
  ]
})
export class AccessIfModule { }
