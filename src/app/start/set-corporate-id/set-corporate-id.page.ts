import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/common/config/api.service';
import { AppStorageService } from 'src/app/common/services/app-storage/app-storage.service';
import { DataService } from 'src/app/common/services/data/data.service';
import { LoginService } from 'src/app/login.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-set-corporate-id',
  templateUrl: './set-corporate-id.page.html',
  styleUrls: ['./set-corporate-id.page.scss'],
  standalone:false
})
export class SetCorporateIdPage implements OnInit {

  errorTrue = false;
  btnClicked = false;
  user = {
    corporatename: ''
  }
  @ViewChild('popModal') popModal!: any;
  constructor(
    public storage: AppStorageService,
    public loginService: LoginService,
    public navControl: NavController,
    public data: DataService,
    public apiService: ApiService
  ) { }

  async ngOnInit() {
    await this.storage.init();
  }

  async setcorporateid(l: NgForm) {
    if (this.user.corporatename === '') {
      this.data.openAlertFalse('Enter Corporate ID')
      return
    }
    if (l.valid) {
      this.errorTrue = false;
      const obj = {
        corporatename: this.user.corporatename
      }
      this.apiService.corpvalidate(obj).subscribe((res: any) => {
        if (res.Status) {
          this.storage.set('corporatename', this.user.corporatename).then(() => {
            this.loginService.login.corporatename = this.user.corporatename;
            this.navControl.navigateRoot('/login-with');
          });
        }
        else {
          this.data.errorMessage(res)
        }
      })

    } else {
      this.errorTrue = true;
    }
  }

  onBtnClick() {
    if (this.popModal) {
      this.popModal.nativeElement?.openModal();
    }
  }

  getStatus(event: any) {
    console.log(event)
    if (event.detail.Status) {
      this.data.successMessage(event.detail)
    }
    else {
      this.data.errorMessage(event.detail)
    }
  }
}
