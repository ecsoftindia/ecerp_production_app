// import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
// import { FullSpinnerService } from './full-spinner.service';
// import { OverlayModule } from '@angular/cdk/overlay';
// import { CommonModule } from '@angular/common';
// import { MatProgressBarModule } from '@angular/material/progress-bar';

// @Component({
//   selector: 'app-full-spinner',
//   templateUrl: './full-spinner.component.html',
//   styleUrls: ['./full-spinner.component.scss'],
//   standalone: true,
//   imports: [CommonModule, OverlayModule, MatProgressBarModule],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
//   providers: [FullSpinnerService],
// })
// export class FullSpinnerComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

// @Component({
//   selector: 'app-empty-spinner',
//   template: '<div class="p-box pt68"><mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar></div>',
//   standalone: true,
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
//   // imports: [CommonModule, OverlayModule, MatProgressBarModule],
//   // providers: [FullSpinnerService],
// })
// export class EmptySpinnerComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


// new====
import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-full-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule , IonicModule],
  template: `
    <div class="overlay-box">
      <!-- <mat-progress-bar mode="indeterminate"></mat-progress-bar> -->
      <ion-progress-bar type="indeterminate" color="primary"></ion-progress-bar>
    </div>
  `,
  styles: [`
    .overlay-box {
      width: 300px;
      height: 4px;
    }
    ::ng-deep .mdc-linear-progress__bar-inner {
      background-color: var(--ion-color-primary) !important;
    }

    ::ng-deep .mdc-linear-progress__buffer {
      background-color: var(--ion-color-primary-shade) !important;
    }
  `]
})
export class FullSpinnerComponent {}


