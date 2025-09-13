import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@Component({
    selector: 'app-empty-spinner',
    standalone: true,
    imports: [CommonModule, MatProgressBarModule , IonicModule],
    template: `
      <div class="spinner-bar">
        <!-- <mat-progress-bar mode="indeterminate"></mat-progress-bar> -->
        <ion-progress-bar type="indeterminate" color="primary"></ion-progress-bar>
      </div>
    `,
    styles: [`
        .spinner-bar {
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
        }

        ::ng-deep .mdc-linear-progress__bar-inner {
      background-color: var(--ion-color-primary) !important;
    }

    ::ng-deep .mdc-linear-progress__buffer {
      background-color: var(--ion-color-primary-shade) !important;
    }
      `]
})
export class EmptySpinnerComponent { }