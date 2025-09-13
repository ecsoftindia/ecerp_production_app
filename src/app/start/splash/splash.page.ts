import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppStorageService } from 'src/app/common/services/app-storage/app-storage.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone:false
})
export class SplashPage implements OnInit {

  constructor(
    public storage: AppStorageService,
    public loginService: LoginService,
    public navController: NavController
  ) { }

 async ngOnInit() {
    await this.storage.init();
     this.checkCorporateId();
  }

 async checkCorporateId() {
    this.storage.get('corporatename').then((val) => {
      if (val) {
        this.loginService.login.corporatename = val;
        this.navController.navigateRoot('/login-with');
      } else {
        this.navController.navigateRoot('/set-corporate-id');
      }
    })
  }

}
