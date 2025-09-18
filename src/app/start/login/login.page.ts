import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { map } from 'rxjs';
import { ApiService } from 'src/app/common/config/api.service';
import { AppConfig } from 'src/app/common/config/app.config';
import { AppStorageService } from 'src/app/common/services/app-storage/app-storage.service';
import { DataService } from 'src/app/common/services/data/data.service';
import { DeviceService } from 'src/app/common/services/device/device.service';
import { TrackingService } from 'src/app/common/services/location/tracking.service';
import { UrlService } from 'src/app/common/services/url/url.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  errorTrue = false;
  @ViewChild('firstInput') firstInputElement!: ElementRef;
  notifyCondition = false;
  btnClicked = false;
  loadingTrue = false;
  otpArray: string[] = ['', '', '', '', '', ''];
  checksettings = false;
  checklabel = false;
  blockappTrue = false;
  notifyTrue = false;
  notifymessage = '';
  userCode: any = '';
  selectedFinYear = {
    finyearcode: '',
    iscurrentfinyear: ''
  };
  currentfinyear: any = [];
  counterCode: any = '';
  type: any = '';
  otpField = false;
  constructor(
    private router: Router,
    public loginService: LoginService,
    public storage: AppStorageService,
    public route: ActivatedRoute,
    public urlService: UrlService,
    public alertController: AlertController,
    public device: DeviceService,
    public navCtrl: NavController,
    public trackService: TrackingService,
    public apiService: ApiService,
    public data: DataService
  ) {
    this.route.paramMap.subscribe(params => {
      this.init();
    });
  }

  ngOnInit() {
    // this.init();
  }

  async init() {
    let paramsId = this.route.snapshot.paramMap.get('id');
    console.log(paramsId)
    this.type = paramsId
    if (this.type === 'otp') {
      this.firstInputElement?.nativeElement.focus();
    }
  }

  goToCorpId() {
    this.navCtrl.navigateRoot('/set-corporate-id');
  }

  moveFocus(event: any, index: number) {
    const input = event.target;
    if (input.value.length > 0) {
      const nextInput = document.querySelectorAll('.otp-input')[index + 1] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  handleBackspace(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && input.value.length === 0) {
      const prevInput = document.querySelectorAll('.otp-input')[index - 1] as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }


  CheckStorage() {
    this.storage.get('authorization').then((val) => {
      if (val !== null) {
        if (val.corporatename === this.loginService.login.corporatename && val.loginid === this.loginService.login.loginid) {
        } else {
          if (this.data.token) {
            this.AllDraftClear();
          }
        }
      }
    });
    const obj = {
      corporatename: this.loginService.login.corporatename,
      loginid: this.loginService.login.loginid,
      // loginpin: '',
      userdeviceid: this.loginService.login.userdeviceid,
      appid: 'ECERP',
      loginotp: '',
    };
    this.storage.set('authorization', obj);
  }

  AllDraftClear() {
    const url = 'alldraftsave/clear'
    this.apiService.deleteInfo(url).subscribe((success) => {
      this.loadingTrue = false;
      // this.data.ClearAllEntryDraft();
    })
  }

  CheckSubmit(l: any) {
    if (l.valid) {
      this.loginService.login.userdeviceid = this.device.deviceID;
      if (this.loginService.login.userdeviceid && this.loginService.login.userdeviceid != '1234') {
        this.onSubmit(l);
      } else {
        this.errorTrue = false;
        this.btnClicked = true;
        const url = 'uniqueid'
        this.loginService.login.userdeviceid = this.device.deviceID;
        this.onSubmit(l);

      }
    } else {
      this.errorTrue = true;
    }
  }

  sendotp() {
    this.otpArray = []
    const obj = {
      corporatename: this.loginService.login.corporatename,
      loginid: this.loginService.login.loginid,
      appid: 'ECERP'
    }
    this.apiService.sendopttocuts(obj).subscribe((success: any) => {
      if (success.Status === true) {
        this.otpField = true
      }
      else {
        this.otpField = false
        this.data.errorMessage(success)
      }
    })
  }

  onSubmit(l: any) {
    if (l.valid) {
      this.CheckStorage();
      this.errorTrue = false;
      this.btnClicked = true;
      if (this.type === 'otp') {
        this.loginService.login.loginotp = this.loginpin;
        this.loginService.login.loginpin = ''
      }
      else if (this.type === 'pwd') {
        this.loginService.login.loginotp = ''
      }
      this.apiService.authenticateuser(this.loginService.login).subscribe((success: any) => {
        if (success.Status) {
          this.storage.set('authorizationResponse', success.data);
          this.userCode = success.data.usercode
          this.storage.set('temptoken', success.data.temptoken);
          this.notifymessage = success.data.notifymessage;

          // success.data.notify = 'YES';
          // success.data.blockapp = 'NO';
          // success.data.notifymessage = "Your app will expired";
          // this.notifymessage = success.data.notifymessage;
          if (success.data.notify === 'YES') {
            this.notifyTrue = true;
            if (success.data.blockapp === 'YES') {
              this.blockappTrue = true;
            }
          } else {
            if (success.data.blockapp === 'YES') {
              this.notifyTrue = true;
              this.blockappTrue = true;
            } else {
              this.currentfinyear = success.data.finyears;
              this.currentfinyear.forEach(async (element: any) => {
                if (element.iscurrentfinyear === 'YES') {
                  this.selectedFinYear.finyearcode = element.finyearcode;
                  await this.storage.set('selectedFinYear', element.finyearcode)
                }
              });
              success.data.branches.forEach((element: any) => {
                this.counterCode = element.counters[0].countercode;
              });
              this.checkAuthorizeLogin(success.data.temptoken, '1', this.counterCode, this.selectedFinYear.finyearcode)
              // setTimeout(() => {
              //   window.location.assign(this.appSetting.environment.basePath + '/login-select-fin-year');
              //   // this.btnClicked = false;
              //   // this.router.navigateByUrl('/login-select-branch');
              // }, 500);
            }
          }

        }
        else {
          this.btnClicked = false;
          if (success.defaultmissing === false) {
            this.data.errorMessage(success);
          }
          else if (success.defaultmissing === true) {
            if (this.checksettings === false) {
              this.checkandInitialize(l);
            }
          }
          else if (success.userprevloggedin === true) {
            // const dialogRef = this.dialog.open(CommonAlertComponent, {
            //   width: '450px',
            //   // disableClose: true,
            //   data: {
            //     msg: success.Message + '.' + '  ' + 'Do you want clear existing session and proceed?',
            //     refreshbtn: true,
            //     trueBtnText: 'YES',
            //     falseBtnText:'NO'
            //   },
            // });

            // dialogRef.afterClosed().subscribe((result:any) => {
            //   console.log(result)
            //   if (result) {
            //     this.clearAllSession(l)
            //   }
            // });
            this.presentAlert(success, l)
          }
          else {
            this.data.errorMessage(success);
          }
        }
      })
    } else {
      this.errorTrue = true;
    }
  }


  checkAuthorizeLogin(token: any, br: any, counter: any, fin: any) {
    const dataset = {
      temptoken: token,
      branchcode: br,
      countercode: counter,
      finyearcode: fin
    };
    this.apiService.authorizeLogin(dataset).subscribe((success: any) => {
      this.registerToken(success.data.token, success.data.branchwisesetup.multigodownrequired);
      setTimeout(() => {
        if (this.data.authorizationResponse.edition_features.approval_systems === 'YES' && this.data.authorizationResponse.approvalrequired === 'YES') {
          this.notifyCondition = true;
          this.storage.set('viewNotify', this.notifyCondition)
        }
        else {
          this.check().subscribe((result) => {
            if (result) {
              this.notifyCondition = true;
              this.storage.set('viewNotify', this.notifyCondition)
            } else {
              this.notifyCondition = false;
              this.storage.set('viewNotify', this.notifyCondition)
            }
          });
        }

      }, 100);

      this.storage.set('isAuthorized', true).then(() => {
        this.storage.set('token', success.data.token).then((token) => {
          this.data.getToken();
          this.storage.set('authorizationkey', success.data).then((result) => {
            this.data.authorizationkey;
          });


          setTimeout(() => {

            this.router.navigateByUrl('/home/dashboard');
          }, 200);

          this.btnClicked = false;
        });
      });
    })
  }



  async presentAlert(success: any, l: any) {
    if (success.userprevloggedin === true) {
      const alert = await this.alertController.create({
        header: 'Session Alert',
        message: `${success.Message}. Do you want to clear existing session and proceed?`,
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'YES',
            handler: () => {
              this.clearAllSession(l);
            }
          }
        ]
      });

      await alert.present();
    }
  }

  clearAllSession(l: any) {
    this.btnClicked = true;
    this.apiService.clearAllSession(this.loginService.login).subscribe((success: any) => {
      if (success.Status === true) {
        this.data.successMessage(success);
        this.CheckSubmit(l);
        this.btnClicked = false
      }
      else {
        this.btnClicked = false
      }
    })
  }

  checkandInitialize(l: any) {
    this.checklabel = true;
    this.apiService.checkandinit(this.loginService.login).subscribe((success) => {
      this.checksettings = true;
      if (success.Status === true) {
        this.checklabel = false;
        this.CheckSubmit(l);
      } else {
        this.checklabel = false;
        this.data.errorMessage(success);
      }
    })

  }


  registerToken(val: any, mulGodown: any): Promise<void> {
    return new Promise((resolve) => {
      const obj = {
        appid: 'ECERP'
      };

      this.data.postDataforReg('register/usersession', obj, val).subscribe((success: any) => {
        if (success.Status === true) {
          // Add any additional success logic here if needed
          // Uncomment as necessary:
          // this.router.navigateByUrl('/home/dashboard');
          // this.general.openAlert(success);
          // this.data.token = val;
          // localStorage.setItem('token', val);
          // this.goNext();
        }
        this.getReportingPersons();
        if (mulGodown === 'YES') {
          this.getGodownSetup();
        }

        // Perform other asynchronous operations
        this.getcurrecydet();
        this.getDefaultCustInfo();
        this.getPriceList();
        this.getApprovalUserCodes();
        this.CheckStorage();

        // Resolve the promise once everything is done
        resolve();
      });
    });
  }

  getDefaultCustInfo() {
    const url = 'customer/4000000'
    this.apiService.getInfo(url).subscribe(async (success: any) => {
      if (success.Status) {
        await this.storage.set('defaultCustInfo', success.data)
      }
    })
  }



  async getReportingPersons() {
    await this.storage.get('authorizationResponse').then((val) => {
      if (val !== null) {
        const obj = {
          activeonly: 'YES',
          usercode: val.usercode
        }
        this.apiService.getReportingToPesrons(obj).subscribe(async (success: any) => {
          if (success.Status) {
            success.data.forEach((element: any) => {

            });
            await this.storage.set('reportingPersons', success.data)
          }
          this.getUserInfo(val.usercode);
        })

      }
    })
  }

  getUserInfo(val: any) {
    this.apiService.getInfo('user/' + val).subscribe((success: any) => {
      if (success.Status) {
        this.storage.set('userInfo', success.data);
      } else {
        console.error('Failed to fetch user info:', success.Message);
      }
      setTimeout(() => {
        this.gettimecheckinout()
      }, 200);

    });

  }

  gettimecheckinout() {
    const url = 'user/mostrecent/loginfo';
    this.apiService.getInfo(url).subscribe(async (result) => {
      if (result.Status === true) {

        if (
          result.data.loggedin === 'NO' ||
          (result.data.loggedin === 'YES' && result.data.loggedout === 'YES')
        ) {
          await this.storage.set('askLogin', 'true');
        } else if (result.data.loggedin === 'YES' && result.data.loggedout === 'NO') {
          const userInfo: any = await this.storage.get('userInfo');
          if (userInfo?.geotrackyn === 'YES') {
            this.trackService.bulkLocLog();
            this.trackService.startTrackingWithAPI(
              AppConfig.basePath + 'bulkupdate/user/locationlogs',
              this.data.token
            );
          }
        } else {
          await this.storage.set('askLogin', 'false');
        }

        this.router.navigateByUrl('/home/dashboard');


      } else {
        await this.storage.set('askLogin', 'true')
        this.router.navigateByUrl('/home/dashboard');
      }


    });
  }

  getGodownSetup() {
    const obj = {
      branchcode: '1'
    }
    this.apiService.getGodownSetup(obj).subscribe((success: any) => {
      if (success.Status) {
        this.storage.set('warehouseSetup', success.data)
      }
    })
  }

  async getApprovalUserCodes() {
    await this.storage.get('authorizationResponse').then((val) => {
      if (val !== null) {
        const url = 'approvalusercodes/detail/' + val.usercode
        this.apiService.getInfo(url).subscribe((success: any) => {
          if (success.Status) {
            this.storage.set('approvalUserCodes', success.data)
          }
        })
      }
    })

  }

  check() {
    // Return the Observable directly
    const url = 'appnotifyrequired/user/' + this.userCode + '/branch/' + '1'
    return this.apiService.getInfo(url).pipe(
      map((success: any) => {
        return success.Status
      })
    );
  }

  async getcurrecydet() {
    await this.storage.get('authorizationResponse').then((val) => {
      if (val !== null) {
        const url = 'currency/' + val.companysetup.companycurrencycode;
        this.apiService.getInfo(url).subscribe((success: any) => {
          if (success.Status) {
            const obj = success.data
            localStorage.setItem('currencyDet', JSON.stringify(obj))
          }
        });
      }
    });
  }


  getPriceList() {
    if (this.data.token !== '') {
      const url = 'pricelist'
      this.apiService.getInfo(url).subscribe((success: any) => {
        if (success.Status) {
          this.storage.set('pricelist', success.data);
        } else {
        }
      })
    } else {
      setTimeout(() => {
        this.getPriceList();
      }, 400);
    }
  }

  get loginpin(): string {
    return this.otpArray.join('');
  }

  set loginpin(value: string) {
    this.otpArray = value.split('');
  }


  // Call this method to synchronize the otpArray with loginService.login.loginpin
  syncLoginpin() {
    this.loginService.login.loginpin = this.loginpin;
  }

  goToCorporate(){
    this.router.navigate(['set-corporate-id'])
  }

}
