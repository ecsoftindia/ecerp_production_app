import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AppStorageService } from './common/services/app-storage/app-storage.service';
import { entLogin } from './common/config/app.classes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  login:any = new entLogin();
  constructor(
    public storage: AppStorageService,
  ) { }


  init() {
    return new Promise((resolve) => {
      // check for corporate id in environment
      let corporateId = environment.corporateId;
      if (corporateId === '') {
        // if check for corporate id in storage
        this.storage.get('corporatename').then((val) => {
          if (val) {
            this.login.corporatename = val;
            resolve(true);
            // this.doRedirect();
          } else {
            resolve(false);
            // if redirect to set corporate is page
            // this.router.navigateByUrl('/set-corporate-id');
          }
        });
      } else {
        this.login.corporatename = corporateId;
        resolve(true);
      }
    })
  }

}
