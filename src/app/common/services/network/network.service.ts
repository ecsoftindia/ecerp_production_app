import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NetworkService implements OnInit, OnDestroy {
  showToast: any = "";
  isToastShowing = false;
  constructor(
    private toastController: ToastController
  ) { }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
  async ngOnInit() {
    // throw new Error('Method not implemented.');
  }

  async getStatus() {
    // this.showToast = await this.toastController.create({
    //   message: 'You are offline',
    //   color: 'danger',
    //   position: 'top',
    //   mode: 'md'
    // });
    // await this.showToast.present();
    // return;
    // const toast = await this.toastController.create();
    const status = await Network.getStatus();
    console.log(status);
    if (!status.connected && !this.isToastShowing) {
      this.isToastShowing = true;
      this.showToast = await this.toastController.create({
        message: 'You are offline',
        color: 'danger',
        position: 'top',
        mode: 'md'
      });
      await this.showToast.present();


    } else {
      console.log(this.showToast);
      if (this.showToast) {
        this.showToast.dismiss();
        this.isToastShowing = false;
        console.log('got hit')
      }
    }
  }

  init() {
    this.getStatus();
    Network.addListener('networkStatusChange', (status: any) => {
      console.log('Network Zone Entered');

      this.getStatus();
    });
  }




}
