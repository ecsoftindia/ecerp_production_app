import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Storage } from '@ionic/storage';
import { Observable, throwError } from 'rxjs';
// import * as fileSaver from 'file-saver';
import { AppConfig } from '../../config/app.config';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
// import { Calendar } from '@ionic-native/calendar/ngx';
// const { Browser } = Plugins;
// import { Plugins } from '@capacitor/core';
import { catchError, finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
//import { MessageBoxComponent } from '../../message-box/message-box.component';
import { DeviceService } from '../device/device.service';

import { AppStorageService } from '../app-storage/app-storage.service';
import { Browser } from '@capacitor/browser';
import { AppServiceService } from 'src/app/app-service.service';
import { LoginService } from 'src/app/login.service';
import { Message } from '../../config/app.classes';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { FileSystemService } from '../file-system/file-system.service';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  pattern = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%|"'~^&*-]).{8,}$/;
  readonly defaultOptions: any = {
    hideErrorMethod: false,
    hideFullSpinner: false,
    hidejwt: false,
  };
  loadingTrue = false;
  btnClicked = false;
  token = "";
  isModalOpen = false;
  isLogoutModalOpen = false;
  // token = "";
  whatsapp: any = {
    apitoken: '',
    deviceapiid: '',
    whatsappenabled: '',
  }
  sms: any = {
    smsgatewayname: '',
    smsusername: '',
    smspassword: '',
    smssenderid: '',
    smsenabled: '',
  };
  Totalcount = 0;
  notifycount = 0;
  approvalcount = '0';
  approvalWaitngcount = '0';
  TotalWaitingcount = 0;
  approval: any = [];
  notifies: any = [];
  approvalWaiting: any = [];
  companylogoTrue = false;
  companyLogo: any;
  userLogo: any;


  basePath = '';

  fycode = '';
  brcode = '';
  authorizationResponse: any = {
    usercode: '',
    salespersonname: '',
    username: '',
    branchcode: '',
    salespersoncode: '',
    type: '',
    typename: '',
    registered: '',
    ratechangeallowed: '',
    salesdiscountallowed: '',
    discountpercentupto: '',
    salesdeleteallowed: '',
    salespersonmandatory: '',
    dayoverrequired: '',
    showdayoverfirst: '',
    closedayupto: '',
    companycode: '',
    companyname: '',
    branchname: '',
    finyear: '',
    finyearautoload: '',
    counters: [],
    temptoken: '',
    showregionalname: '',
    showbalancetopayscreen: '',
    itemdiscountallowed: '',
    showdob: '',
    dobmandatory: '',
    showdow: '',
    dowmandatory: '',
    instantsearchrequired: '',
    instantsearchlength: '',
    noofitemsonsearch: '',
    branches: [],
    rights: [],
    webposallowed: '',
    softwaresetup: {
      data: {
        quantitypricecolumns: {
          saleraterequired: '',
          dealerraterequired: '',
          price1required: '',
          price2required: '',
          price3required: '',
          price4required: '',
          price5required: '',
          price6required: ''
        },
        branchtransferratefrommrpprofit: '',
        branchwisepricing: '',
        batchconceptsyn: '',
        quantitybasedsetup: '',
        autorateupdateonpurchase: '',
        allowissuemorethanbom: '',
        multigrouplevel: '',
        branchwiseitem: '',
        multibarcodeonitem: '',
        instantsearchlength: '',
        singlewindowmatrixsearch: '',
        indentrequired: '',
        multicurrencyonpurchase: '',
        multicurrencyonsales: '',
        salespersonrequired: '',
        salespersonentrytype: '',
        costcenterrequired: '',
        smsattachmentlinktype: '',
        showcustomerdob: '',
        showcustomerdow: '',
        customerdobmust: '',
        customerdowmust: '',
        allreceiptmodes: [],
        selectedreceiptmodes: [],
        directpurchaseallowed: '',
        pobasedpurchaseallowed: '',
        goodsinwardreq: '',
        inwardinspectionreq: '',
        godowntransferreq: '',
        productconversionreq: '',
        smsviawhatsapp: '',
        directgrnallowed: '',
        pobasedgrnallowed: '',
        inv_on_purchase: '',
        inv_on_grn: '',
        salesno_gentype_code: '',
        salesno_gentype_name: '',
        entrywise_contact_mandatory: '',
        default_receipt_mode: '',
        directsalesallowed: '',
        quotation_based_sales: '',
        order_based_sales: '',
        dc_based_sales: '',
        allowmultipoinward_to_purchase: '',
        allowmultioadc_to_sales: '',
        integrateeinvoice: '',
        integrateewaybill: '',
        ewaybill_thresholdlimitfor_code: '',
        ewaybill_thresholdlimitfor_name: '',
        intrastate_ewaybillyn: '',
        intrastateewaybill_thresholdlimit: '',
        interstateewaybill_thresholdlimit: '',
        salesorder_number_automatic_generation: '',
        dc_number_automatic_generation: '',
        receipt_number_automatic_generation: '',
        sales_number_automatic_generation: '',
        suppid_automatic_generation: '',
        suppautoid_generation_type: '',
        newwolockdays: '',
        suppautoid_prefix: '',
        suppautoid_number: '',
        suppautoid_formatdigits: '',
        custid_automatic_generation: '',
        custautoid_generation_type: '',
        custautoid_prefix: '',
        custautoid_number: '',
        custautoid_formatdigits: '',
        productid_automatic_generation: '',
        productautoid_generation_type: '',
        productautoid_prefix: '',
        productautoid_number: '',
        productautoid_formatdigits: '',
        productautoid_skip_number: '',
        quotno_generation_type: '',
        quot_mandatory_for_oa: '',
        custorderno_mand_onsales: '',
        default_search_method: '',
        notes_mand_onpo_withoutindent: '',
        batchno_takenfrom_prevpurchase: '',
        duplicate_custpono_allow_in_oa: '',
        duplicate_suppquotno_allow_in_po: '',
        default_inclusivetax_on_customer: '',
        restrict_space_in_id: '',
        upper_conversion_req: '',
        sendsms_alwaystrue_oncust: '',
        sendemail_alwaystrue_oncust: '',
        masterprice_req_bydefault_onproduct: '',
        autorateupdate_req_bydefault_onproduct: '',
        rewardcalc_req_on_cust_bydefault: '',
        billvalue_zero_dontallow_onsales: '',
        zerostk_display_on_productsearch: '',
        cursor_focus_on_id: '',
        dontallow_expirylessthan_item: '',
        expiry_lessthan_days: '',
        sales_disc_req_on_pur: '',
        barcode_usein_purchase: '',
        salesdisc_tobe_takenfrom: '',
        productsearch_basedon_barcode_onsales: '',
        alertpayment_on_materialrejection: '',
        prratechange_alert_req_onpur: '',
        suppratechange_alert_req_onpur: '',
        maxstockalertonpurchase: '',
        minstockalertonsales: '',
        minmaxstocksmsalert: '',
        minmaxstockemailalert: '',
        restore_previous_sales_item_details: '',
        showsupplieronproduct: '',
        showcustinfoonpurchase: '',
        salessmsalertperiodically: '',
        salessmsalertperiodicalinterval: '',
        salessmsalertperiodicallymobileno: '',
        salesemailalertperiodically: '',
        salesemailalertperiodicalinterval: '',
        salesemailalertperiodicallymailid: '',
        serialno_generation_type: '',
        serialno_generation_typename: '',
        productionorderreq: '',
        fgerequired: '',
        mrnrequired: '',
        fgirequired: '',
        workorderreq: '',
        goodsissuereq: '',
        maxfilesizeinmb: '',
        datewise_accountlock: '',
        accountlock_date: '',
        drawingdetailynonbom: '',
        itemnamedupallowed: ''
      }
    },
    edition_features: {
      approval_systems: '',
      batch_stocks_management: '',
      branchstocktransfer: '',
      brs_management: '',
      contra: '',
      cost_center_management: '',
      counter_management: '',
      coupen_management: '',
      adcoupen_managementd: '',
      credit_note: '',
      customer_loyalities: '',
      customerdc: '',
      customerwise_pricing: '',
      debit_note: '',
      freeoffer: '',
      godowntransfer: '',
      goodsissue: '',
      indent: '',
      inward: '',
      inward_inspection: '',
      journal: '',
      ledger_opening_balance: '',
      matrix_stocks_management: '',
      multicurrency_management: '',
      multiwarehouses: '',
      openingstocks: '',
      party_opening_bills: '',
      payments: '',
      pdc: '',
      po: '',
      productconversion: '',
      purchase: '',
      purchasereturn: '',
      quotation: '',
      receipts: '',
      sales_acknowledgement: '',
      sales_invoice: '',
      sales_pos: '',
      sales_target_management: '',
      salesexchange: '',
      salesorder: '',
      salesreturn: '',
      serial_stocks_management: '',
      sms_and_email_communications: '',
      stock_audit_checking: '',
      stock_release: '',
      supplierdc: '',
      tally_export: '',
      tcs_collections: '',
      useraccess_and_rightscontrols: '',
      wastage: '',
      production: ''
    },
    companysetup: {
      companytaxtype: '',
      timeformat24hr: '',
      amountdecimalplaces: '',
      countrycode: '',
      statecode: '',
      companycurrencyid: '',
      companycurrencycode: '',
      mrpconceptrequired: '',
      regionalfontname: ''
    },
    usersetup: {
      salesdeleteallowed: '',
      godownchangeable: '',
      salesdiscountallowed: '',
      salesreprintallowed: '',
      salesupdateallowed: '',
      discountpercentupto: '',
      margincalconitem: '',
      userbillmode: '',
      showsettings: '',
      ratechangeallowed: '',
      itemdiscountallowed: '',
      viewactivites: ''
    },
    singlebranch: '',
    branchwisesetup: {
      multigodownrequired: '',
      dayoverprocessrequired: ''
    },
    approvalrequired: '',
    totalbranchcount: ''
  };
  selectedBranch = {
    branchcode: '',
    countercode: '',
  };
  message = new Message();
  messageBoxExpandTrue = false;
  userimage = '';
  companyimage = '';
  coimage = '';
  bgClass = '';
  poreport = false;
  notificationCount!: number;
  authorizationkey = {
    token: '',
    branchwisesetup: {
      multigodownrequired: '',
      dayoverprocessrequired: ''
    }
  };
  warehouseDet = {
    entrytypecode: '',
    godowncode: '',
    changeable: ''
  };
  itemwisegodown = false;

  isLoggedIn = false;
  // messageBox = new MessageBoxComponent();
  // message = {
  //   errorMessage: [
  //     { msgID: 0, msgType: 0, msgDescription: 'Hello This Error' },
  //   ],
  // };

  bottom = '0';
  filter: any = '';
  selectedbrcode: any = '1';
  currencySymbol: any = '';
  showGoogleMap: boolean = true;
  constructor(
    public http: HttpClient,
    public storage: AppStorageService,
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public device: DeviceService,
    public loginService: LoginService,
    public appService: AppServiceService,
    public fileService: FileSystemService,
    public sanitizer: DomSanitizer,


  ) { }

  async getToken() {
    // 
    await this.storage.get('token').then((token) => {
      if (token !== null) {
        this.token = token;
      }
    });

    // await this.storage.get('rightsData').then((val) => {
    //   if (val) {
    //     this.rightsService.rightsProf.data = val;
    //     // this.token = val.token;
    //   }
    // }); 
  }
  checkToken(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (this.token !== '') {
        resolve(true);
      } else {
        await this.storage.get('token').then((val) => {
          if (val) {
            this.token = val;
            resolve(true);
          }
        });
      }
    });


  }

  async getLoggedIn() {
    await this.storage.get('isLoggedIn').then((val) => {
      if (val) {
        this.isLoggedIn = val;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  getAuthResponse() {
    this.storage.get('authorizationResponse').then((val) => {
      console.log(val)
      if (val) {
        this.authorizationResponse = val;
        this.getCurrencySymbol()
      }
    });
  }

  getAuthorizationkey() {
    this.storage.get('authorizationkey').then((val) => {
      if (val) {
        this.authorizationkey = val;
      }
    });
  }

  setOptions(options?: any) {
    for (const opPath of Object.keys(this.defaultOptions)) {
      options[opPath] === undefined
        ? (options[opPath] = this.defaultOptions[opPath])
        : '';
    }
    // debugger;
    return options;
  }
  serviceStarted() {
    // // console.log('Service Call Started');
    this.message = new Message();
    this.loadingTrue = true;
    this.btnClicked = true;
  }
  serviceCompleted() {
    // // console.log('Service Call Completed');
    this.loadingTrue = false;
    this.btnClicked = false;
  }

  getData(path: any, options?: any): Observable<any> {
    let headers = new HttpHeaders();


    if (!options?.hideJwt) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }

    if (!options?.hideFullSpinner) {
      headers = headers.set('Spinner', 'true');
    }

    return this.http.get(AppConfig.basePath + path, { headers });

    let obj: any = {
      Authorization: 'Bearer ' + this.token,
      Spinner: 'true'
    }
    if (options?.hideFullSpinner) {
      delete obj['Spinner']
      // obj.pop('Spinner');
    }
    if (options?.hidejwt) {
      delete obj['Authorization'];
      // obj.pop('Authorization');
    }
    const header = new HttpHeaders(obj);
    return this.http.get(AppConfig.basePath + path, { headers: header });
  }
  deleteData(path: string, options?: { hideJwt?: boolean; hideFullSpinner?: boolean }): Observable<any> {
    let headers = new HttpHeaders();


    if (!options?.hideJwt) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }

    if (!options?.hideFullSpinner) {
      headers = headers.set('Spinner', 'true');
    }

    return this.http.delete(AppConfig.basePath + path, { headers });
  }


  postData(path: string, body: any, options?: { hideJwt?: boolean; hideFullSpinner?: boolean }): Observable<any> {
    let headers = new HttpHeaders();

    if (!options?.hideJwt) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }

    if (!options?.hideFullSpinner) {
      headers = headers.set('Spinner', 'true');
    }

    return this.http.post(AppConfig.basePath + path, body, { headers });
  }




  postData1(
    path: string,
    body: any,
    options?: { hideJwt?: boolean; hideFullSpinner?: boolean }
  ) {
    let headers = new HttpHeaders();

    if (!options?.hideJwt) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }

    if (!options?.hideFullSpinner) {
      headers = headers.set('Spinner', 'true');
    }

    return this.http.post(AppConfig.basePath + path, body, { headers });
  }


  putData(
    path: string,
    body: any,
    options?: { hideJwt?: boolean; hideFullSpinner?: boolean }
  ) {
    let headers = new HttpHeaders();

    if (!options?.hideJwt) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }

    if (!options?.hideFullSpinner) {
      headers = headers.set('Spinner', 'true');
    }

    return this.http.put(AppConfig.basePath + path, body, { headers });
  }


  postPDFData(path: any, body: any, options?: any) {
    let headers = new HttpHeaders();
    if (options && options.hideJwt) {
      headers = headers.set('Spinner', options.hideFullSpinner ? '' : 'true');
    } else {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
      // headers = headers.set(
      //   'Spinner',
      //   options && options.hideFullSpinner ? '' : 'true'
      // );
    }
    return this.http.post(AppConfig.printUrl + path, body, {
      headers: headers,
      responseType: 'blob',
    });
  }


  getPDFData(path: any, options?: any) {
    let headers = new HttpHeaders();
    if (options && options.hideJwt) {
      // headers = headers.set('Spinner', options.hideFullSpinner ? '' : 'true');
    } else {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
      // headers = headers.set(
      //   'Spinner',
      //   options && options.hideFullSpinner ? '' : 'true'
      // );
    }
    return this.http.get(AppConfig.basePath + path, {
      headers: headers,
      responseType: 'blob',
    });
  }
  // getPDFData(path:any, body:any, options?:any) {
  //   const header = new HttpHeaders({
  //     Authorization: 'Bearer ' + this.token,
  //   });
  //   return this.http.post(AppConfig.basePath + path, body, {
  //     headers: header,
  //     responseType: 'blob',
  //   });
  // }
  // checkToken(): Promise<boolean> {
  //   return new Promise(async (resolve, reject) => {
  //     if (this.token !== '') {
  //       resolve(true);
  //     } else {
  //       await this.storage.get('userData').then((val) => {
  //         //  debugger;
  //         if (val) {
  //           this.token = val.token;
  //           this.appService.userData = val;
  //           resolve(true);
  //         }
  //       });

  //     }
  //   });
  // }
  opendocument(body: any, options?: any): Observable<any> {
    this.serviceStarted();
    options === undefined
      ? (options = this.defaultOptions)
      : (options = this.setOptions(options));
    return this.postPDFData('common/opendocument', body, options).pipe(
      finalize(() => this.serviceCompleted()),
      catchError((err: any) => {
        options.hideErrorMethod ? '' : this.errorMethod(err);
        return throwError(err);
      })
    );
  }
  // clearMessage
  clearMessage() { }

  // Error Methods
  errorMethod(err: any) {
    // // console.log(err:any);
    switch (err.status) {
      case 400:
        this.message = err.error;
        setTimeout(() => {
          this.messageBoxExpandTrue = true;
        }, 500);
        // // console.log(this.message);
        break;
      case 401:
        this.confirmSessionOut('');
        break;
      case 500:
        this.internalServerError(err.error);
        break;
      case 501:
        this.internalServerError(err.error);
        break;
      case 503:
        this.internalServerError(err.error);
        break;
      // case 0:
      //   if (err.statusText === 'Unknown Error') {
      //     this.internalServerError('');
      //     break;
      //   }
      default:
        break;
    }
  }

  async internalServerError(msg: any) {
    // console.log(msg);
    let xmsg = '';
    msg !== '' && msg != null
      ? (xmsg = msg)
      : (xmsg =
        'We are currently facing some technical issues right now. Please try again after some time.');
    // // console.log(xmsg);

    const alert = await this.alertController.create({
      cssClass: 'errorMsg',
      header: 'Alert',
      message: xmsg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async confirmSessionOut(msg: any) {
    if (!this.isLogoutModalOpen) {
      this.isLogoutModalOpen = true;
      let xmsg = '';
      msg !== ''
        ? (xmsg = msg)
        : (xmsg = 'Your session expired. Please login again to continue.');
      const alert = await this.alertController.create({
        cssClass: 'errorMsg',
        header: 'Alert',
        message: xmsg,
        buttons: [
          {
            text: 'Go to Login',
            handler: () => {
              this.isLogoutModalOpen = false;
              this.router.navigateByUrl('login-with');
            },
          },
        ],
      });
      await alert.present();
    }

  }
  async errorAlertList(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'danger',
      buttons: ['Ok'],
    });
    toast.present();
  }

  async errorAlert(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'danger',
      buttons: ['Ok'],
      position: "top",
      cssClass: 'error-bg'
    });
    toast.present();
  }

  async successMessage(msg: any) {
    const alert = await this.toastController.create({
      message: msg.Message,
      duration: 3000,
      color: 'primary',
      buttons: ['Ok'],
      position: 'top',
      cssClass: 'success-bg'
    });

    await alert.present();
  }

  // createEvent(title, location, notes, startDate, endDate) {
  //   this.calendar.createEvent(title, location, notes, startDate, endDate).then(
  //     (msg:any) => {},
  //     (error) => {}
  //   );
  // }
  pdf(path: any, credentials: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      });
      this.http
        .post(path, credentials, { headers: headers, responseType: 'blob' })
        .subscribe(
          (res) => {
            const resp = new Blob([res], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(resp);
            resolve(fileURL);
            // this.openBrowser(fileURL);
            // window.open(fileURL, '_blank');
          },
          (err: any) => {
            reject(err);
          }
        );
    });

    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
  }

  async openBrowser(url: any) {
    await Browser.open({ url: url });
  }

  // async presentLoading() {
  //   const loading = await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Please wait...',
  //   });
  //   await loading.present();
  // }
  constructErrorMsg(val: any) {
    this.message.hasError = true;
    this.message.errorMessage = [];
    const obj = {
      msgID: 0,
      msgType: 0,
      msgDescription: val,
    };
    this.message.errorMessage.push(obj);
    setTimeout(() => {
      this.messageBoxExpandTrue = true;
    }, 400);
  }
  // async preload(val) {
  //   // await this.loadingController.dismiss();
  //   if (val) {
  //     const loading = await this.loadingController.create({
  //       message: 'Please wait...',
  //     });
  //     await loading.present();
  //   } else if (val === false) {
  //     await this.loadingController.dismiss();
  //   }
  // }

  async errorMessage(msg: any) {
    const toast = await this.toastController.create({
      message: msg.Message,
      duration: 3000,
      color: 'danger',
      buttons: ['Ok'],
      position: "top",
    });
    toast.present();
    // console.log(msg);
  }


  postDataforReg(path: any, body: any, token: any, options?: any) {
    let header = {};
    if (options) {
      if (options.hidejwt) {
        header = new HttpHeaders({
          // Spinner: options.hideFullSpinner ? '' : 'true',
        });
      } else {
        header = new HttpHeaders({
          Authorization: 'Bearer ' + token,
          // Spinner: options.hideFullSpinner ? '' : 'true',
        });
      }
    } else {
      header = new HttpHeaders({
        Authorization: 'Bearer ' + token,
        // Spinner: options.hideFullSpinner ? '' : 'true',
      });
    }
    let response = this.http.post(AppConfig.basePath + path, body, { headers: header });
    return response;
  }

  image(path: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders(
        { 'Authorization': 'Bearer ' + this.token }
      );
      return this.http.get(AppConfig.basePath + path,
        { headers: headers, responseType: 'blob' })
        .subscribe(res => {
          const resp = new Blob([res]);
          const url = window.URL;
          if (res.size !== 0) {
            this.companyLogo = this.sanitizer.bypassSecurityTrustUrl(url.createObjectURL(resp));
            this.companylogoTrue = true;
          }
          else {

            this.companyLogo = ''
          }


        });
    });
  }

  getCurrencySymbol() {
    if (localStorage.getItem('currencyDet') !== null) {
      try {
        let val: any = localStorage.getItem('currencyDet');
        let parsedVal = JSON.parse(val);
        this.currencySymbol = parsedVal.currencysymbol

      } catch (error) {
        console.error('Error processing data:', error);
      }
    }
  }
  // usersimage(path: any, options: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     let headers = new HttpHeaders({
  //       'Authorization': 'Bearer ' + this.token
  //     });

  //     headers = headers.set(
  //       'Spinner',
  //       options && options.hideFullSpinner ? '' : 'true'
  //     );

  //     this.http.get(AppConfig.basePath + path, { headers: headers, responseType: 'blob' })
  //       .subscribe(
  //         res => {
  //           const resp = new Blob([res]);
  //           const url = window.URL;
  //           if (res.size !== 0) {
  //             this.userLogo = this.sanitizer.bypassSecurityTrustUrl(url.createObjectURL(resp));
  //             this.companylogoTrue = true;
  //             resolve(this.userLogo);  // Resolve the promise with the user logo
  //           } else {
  //             this.userLogo = '';
  //             resolve(null);  // Resolve with null if no logo found
  //           }
  //         },
  //         error => {
  //           console.error('Error fetching user image:', error);
  //           reject(error);  // Reject the promise with an error
  //         }
  //       );
  //   });
  // }

  getUserimg(path: string, options?: { hideJwt?: boolean; hideFullSpinner?: boolean }): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();

      if (options?.hideJwt) {
        headers = headers.set('Spinner', options.hideFullSpinner ? '' : 'true');
      } else {
        headers = headers.set('Authorization', `Bearer ${this.token}`);
        headers = headers.set('Spinner', options?.hideFullSpinner ? '' : 'true');
      }

      this.http.get(AppConfig.basePath + path, { headers: headers, responseType: 'blob' })
        .subscribe(
          res => {
            if (res.size !== 0) {
              const url = window.URL.createObjectURL(res);
              this.userLogo = this.sanitizer.bypassSecurityTrustUrl(url);
              this.companylogoTrue = true;
              resolve(this.userLogo);
            } else {
              this.userLogo = '';
              resolve(null);  // Resolve with null if no logo found
            }
          },
          error => {
            console.error('Error fetching user image:', error);
            reject(error);  // Reject the promise with an error
          }
        );
    });
  }



  async getWarehouseSetup(value: any) {
    await this.storage.get('warehouseSetup').then((val) => {
      if (val) {
        val.forEach((element: any) => {
          if (element.entrytypecode === value) {
            console.log(element)
            this.warehouseDet.changeable = element.changeable;
            this.warehouseDet.entrytypecode = element.entrytypecode;
            this.warehouseDet.godowncode = element.godowncode;
          }
        });
      }
    });
  }


  pdfs(credentials: any) {
    const headers = new HttpHeaders(
      { Authorization: 'Bearer ' + this.token }
    );
    return this.http.post(AppConfig.printUrl + 'pdf', credentials,
      { headers, responseType: 'blob' })
      .subscribe(res => {
        const resp = new Blob([res], { type: 'application/pdf' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          // console.log(reader.result);
          let base64String: any = reader.result;
          // let string = base64String.replace("data:application/pdf;base64,", "");
          let writeFile: any = await this.fileService.writeFile(credentials.data.entryno + '.pdf', base64String);
          if (writeFile) {
            // this.successMessage('File downloaded successfully');
            this.fileService.openFile(writeFile.uri, resp.type);
          }
        };
        reader.readAsDataURL(resp);



        // const fileURL = URL.createObjectURL(resp);
        // window.open(fileURL, '_blank');
      }, (err) => {
      });
  }

  getCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get month (zero-based) and pad with leading zero
    const year = currentDate.getFullYear(); // Get full year

    return `${day}/${month}/${year}`; // Return the formatted date
  }


  // public async pickImage() {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: false,
  //     resultType: CameraResultType.Uri,
  //     source: CameraSource.Photos, // Use CameraSource.Camera for capturing a photo
  //   });
  //   const filename = image.webPath!.substring(image.webPath!.lastIndexOf('/') + 1);
  //   // Convert the image to a Blob
  //   const response = await fetch(image.webPath!);
  //   console.log(response)
  //   const blob = await response.blob();

  //   return {blob , filename};
  // }

  postFile(path: any, credentials: any) {
    return new Promise((resolve, reject) => {
      const header = new HttpHeaders(
        { Authorization: 'Bearer ' + this.token },
      );
      this.http.post(AppConfig.basePath + path, credentials, { headers: header })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });
  }


  async askToTurnOnGPS(): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      LocationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          // the accuracy option will be ignored by iOS
          LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () => {
              resolve(true);
            },
            (error: any) => { resolve(false); }
          );
        }
        else { resolve(false); }
      });
    })
  }

  getTomorrowDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate() + 1).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get month (zero-based) and pad with leading zero
    const year = currentDate.getFullYear(); // Get full year

    return `${day}/${month}/${year}`; // Return the formatted date
  }

  getYesterdayDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate() - 1).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get month (zero-based) and pad with leading zero
    const year = currentDate.getFullYear(); // Get full year

    return `${day}/${month}/${year}`; // Return the formatted date
  }

  download(path: any, filename: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders(
        { 'Authorization': 'Bearer ' + this.token }
      );
      this.http.get(AppConfig.printUrl + path, { headers: headers, responseType: 'blob' })
        .subscribe(res => {
          resolve(res);
          const blob = new Blob([res], { type: 'application/pdf' });
          const reader = new FileReader();
          reader.onloadend = async () => {
            // console.log(reader.result);
            let base64String: any = reader.result;
            // let string = base64String.replace("data:application/pdf;base64,", "");
            let writeFile: any = await this.fileService.writeFile(filename + '.pdf', base64String);
            if (writeFile) {
              // this.successMessage('File downloaded successfully');
              this.fileService.openFile(writeFile.uri, blob.type);
            }
          };
          reader.readAsDataURL(blob);
          // const filename = 'test.jpg';
          // console.log(filename);
          // fileSaver.saveAs(blob, filename);
        }, (err) => {
          // this.errorResponse(err);
          reject(err);
        });
    });
  }
  async openAlertFalse(val: any) {
    console.log(val)
    const toast = await this.toastController.create({
      message: val,
      duration: 3000,
      color: 'danger',
      buttons: ['Ok'],
      position: "top",
      swipeGesture: 'vertical',
      cssClass: 'error-bg'
    });
    toast.present();
  }

}
