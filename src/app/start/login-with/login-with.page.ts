import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/common/config/api.service';
import { AppStorageService } from 'src/app/common/services/app-storage/app-storage.service';
import { DataService } from 'src/app/common/services/data/data.service';
import { UrlService } from 'src/app/common/services/url/url.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-login-with',
  templateUrl: './login-with.page.html',
  styleUrls: ['./login-with.page.scss'],
  standalone: false
})
export class LoginWithPage implements OnInit {

  constructor(
    public router: Router,
    public navCtrl: NavController,
    public urlService: UrlService,
  ) { }

  ngOnInit() {
  }
  goToCorpId() {
    this.navCtrl.navigateRoot('/set-corporate-id');
  }

  async loginwith() {
    this.router.navigateByUrl('/login/' + 'otp')
  }

  async loginwithpass() {
    this.router.navigateByUrl('/login/' + 'pwd')
  }



}
