import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/common/config/api.service';
import { AppStorageService } from 'src/app/common/services/app-storage/app-storage.service';
import { DataService } from 'src/app/common/services/data/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: false
})
export class HeaderPage implements OnInit {

  constructor(
    public router: Router,
    public apiService: ApiService,
    public data: DataService,
    public storage: AppStorageService,
  ) { }

  ngOnInit() {
  }



  AllDraftClear() {
    const url = 'alldraftsave/clear'
    this.apiService.deleteInfo(url).subscribe((success: any) => {

      let keyname = ['authorizationResponse', 'selectedBranch', 'isAuthorized', 'token', 'temptoken', 'authorizationkey', 'selectedFinYear', 'warehouseSetup', 'approvalUserCodes', 'viewNotify', 'copy', 'copypaste'];

      keyname.forEach((element: any) => {
        this.storage.remove(element)
      })
      localStorage.removeItem('currencyDet')
      this.clearCurrentSession();

    })
  }

  clearCurrentSession() {
    const url = 'clear/user/currentsession'
    this.apiService.deleteInfo(url).subscribe((success) => {
      this.ClearAllDraft();
      setTimeout(() => {
        this.router.navigateByUrl('login-with')
        // this.ClearTokenEtc();
      }, 500);
    })
  }

  ClearAllDraft() {
    let keyName = ['selected_machine']
    keyName.forEach((element: any) => {
      this.storage.remove(element)
    })
  }
}
