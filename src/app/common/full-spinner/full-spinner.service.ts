// import { Injectable } from '@angular/core';
// import {
//   FullSpinnerComponent,
//   EmptySpinnerComponent,
// } from './full-spinner.component';
// import { Overlay } from '@angular/cdk/overlay';
// import { ComponentPortal } from '@angular/cdk/portal';
// import { defer, NEVER, Observable, Subject } from 'rxjs';
// import { mapTo, scan, map, mergeMap, finalize, share } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class FullSpinnerService {
//   private spinnerTopRef = this.cdkSpinnerCreate();
//   private spinnerTopRefLight = this.cdkSpinnerCreateLight();
//   spin: Subject<boolean> = new Subject();
//   empty: Subject<boolean> = new Subject();
//   constructor(private overlay: Overlay, public router: Router) {
//     this.spin
//       .asObservable()
//       .pipe(
//         map((val) => (val ? 1 : -1)),
//         scan((acc, one) => (acc + one >= 0 ? acc + one : 0), 0)
//       )
//       .subscribe((res) => {
//         if (res === 1) {
//           this.showSpinner();
//         } else if (res === 0) {
//           // tslint:disable-next-line: no-unused-expression
//           this.spinnerTopRef.hasAttached() ? this.stopSpinner() : null;
//         }
//       });
//     this.empty
//       .asObservable()
//       .pipe(
//         map((val) => (val ? 1 : -1)),
//         scan((acc, one) => (acc + one >= 0 ? acc + one : 0), 0)
//       )
//       .subscribe((res) => {
//         if (res === 1) {
//           this.showEmptySpinner();
//         } else if (res === 0) {
//           // tslint:disable-next-line: no-unused-expression
//           this.spinnerTopRefLight.hasAttached()
//             ? this.stopEmptySpinner()
//             : null;
//         }
//       });
//   }

//   private cdkSpinnerCreate() {
//     return this.overlay.create({
//       hasBackdrop: true,
//       backdropClass: 'dark-backdrop',
//       positionStrategy: this.overlay
//         .position()
//         .global()
//         .centerHorizontally()
//         .centerVertically(),
//     });
//   }
//   private cdkSpinnerCreateLight() {
//     // const path =
//     // console.log(this.router.url);
//     return this.overlay.create({
//       width: '100%',
//       hasBackdrop: true,
//       backdropClass: 'no-backdrop',
//       panelClass: this.router.url === '/login' ? 'no-panel-pad' : '',
//       positionStrategy: this.overlay.position().global(),
//       // .centerHorizontally()
//       // .centerVertically()
//     });
//   }

//   private showEmptySpinner() {
//     // console.log('attach');
//     this.spinnerTopRefLight.attach(new ComponentPortal(EmptySpinnerComponent));
//   }

//    showSpinner() {
//     // console.log('attach');
//     this.spinnerTopRef.attach(new ComponentPortal(FullSpinnerComponent));
//   }

//    stopSpinner() {
//     // console.log('dispose');
//     this.spinnerTopRef.detach();
//   }
//   private stopEmptySpinner() {
//     // console.log('dispose');
//     this.spinnerTopRefLight.detach();
//   }

//   public readonly emptySpinner = defer(() => {
//     this.showEmptySpinner();
//     return NEVER.pipe(
//       finalize(() => {
//         this.spinnerTopRefLight.hasAttached() ? this.stopEmptySpinner() : null;
//       })
//     );
//   }).pipe(share());
// }


//new


import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { scan, map } from 'rxjs/operators';
import { FullSpinnerComponent } from './full-spinner.component';
import { EmptySpinnerComponent } from './empty-spinner.component';

@Injectable({ providedIn: 'root' })
export class FullSpinnerService {
  private spinnerOverlay = this.createOverlay(true);
  private emptySpinnerOverlay = this.createOverlay(false);

  spin = new Subject<boolean>();
  empty = new Subject<boolean>();

  constructor(private overlay: Overlay) {
    // Handle Full Spinner
    this.spin.pipe(
      map(val => val ? 1 : -1),
      scan((acc, value) => Math.max(acc + value, 0), 0)
    ).subscribe(count => {
      if (count === 1) this.showFullSpinner();
      else if (count === 0 && this.spinnerOverlay.hasAttached()) this.hideFullSpinner();
    });

    // Handle Empty Spinner
    this.empty.pipe(
      map(val => val ? 1 : -1),
      scan((acc, value) => Math.max(acc + value, 0), 0)
    ).subscribe(count => {
      if (count === 1) this.showEmptySpinner();
      else if (count === 0 && this.emptySpinnerOverlay.hasAttached()) this.hideEmptySpinner();
    });
  }

  private createOverlay(isFull: boolean) {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: isFull ? 'dark-backdrop' : 'no-backdrop',
      width: '100%', 
      panelClass: isFull ? 'full-spinner-panel' : 'empty-spinner-panel',
      positionStrategy: this.overlay.position()
        .global()
        .top('0')
        .left('0'),
    });
  }
  
  
  

  private showFullSpinner() {
    if (!this.spinnerOverlay.hasAttached()) {
      this.spinnerOverlay.attach(new ComponentPortal(FullSpinnerComponent));
    }
  }

  private hideFullSpinner() {
    this.spinnerOverlay.detach();
  }

  private hideEmptySpinner() {
    this.emptySpinnerOverlay.detach();
  }

  // Public trigger methods
  showFull() {
    this.spin.next(true);
  }

  hideFull() {
    this.spin.next(false);
  }

  showEmpty() {
    this.empty.next(true);
  }
  
  hideEmpty() {
    this.empty.next(false);
  }
  
  private showEmptySpinner() {
    if (!this.emptySpinnerOverlay.hasAttached()) {
      this.emptySpinnerOverlay.attach(new ComponentPortal(EmptySpinnerComponent));
    }
  }
  
}

