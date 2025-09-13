



// import {
//   HttpEvent,
//   HttpHandler,
//   HttpHeaders,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, Subscription } from 'rxjs';
// import { finalize } from 'rxjs/operators';
// import { FullSpinnerService } from './full-spinner.service';
// @Injectable()
// export class FullSpinnerInterceptor implements HttpInterceptor {
//   constructor(private readonly fullSpinner: FullSpinnerService) { }

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     // console.log(req.headers.get('spinner'));
//     // let spinnerSubscription: Subscription;
//     // if (req.headers.get('spinner') === 'true') {
//     //   req.headers.delete('spinner');
//     //   //   console.log('ok');
//     //   spinnerSubscription = this.fullSpinner.emptySpinner.subscribe();
//     // }
//     let spinnerSubscription: Subscription;
//     if (req.headers.has('Spinner')) {
//       spinnerSubscription = this.fullSpinner.emptySpinner.subscribe();
//     }
//     let auth: any = req.headers.has('Authorization') ? req.headers.get('Authorization') : '';
//     const newRequest = req.clone({
//       headers: new HttpHeaders({
//         'Authorization': auth
//       })
//     })
//     return next.handle(newRequest).pipe(
//       finalize(() => {
//         if (spinnerSubscription) {
//           spinnerSubscription.unsubscribe();
//         }
//       })
//     );
//   }
// }


//new
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FullSpinnerService } from './full-spinner.service';

@Injectable()
export class FullSpinnerInterceptor implements HttpInterceptor {
  constructor(private fullSpinner: FullSpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const shouldShowSpinner = req.headers.get('Spinner') === 'true';
    const cleanedHeaders = req.headers.delete('Spinner');
    const newReq = req.clone({ headers: cleanedHeaders });
    if (shouldShowSpinner) {
      this.fullSpinner.showEmpty();
    }
  
    return next.handle(newReq).pipe(
      finalize(() => {
        if (shouldShowSpinner) {
          this.fullSpinner.hideEmpty();
        }
      })
    );
  }
  
}
