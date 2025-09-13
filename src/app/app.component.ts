import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform, ModalController, NavController } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { AppStorageService } from './common/services/app-storage/app-storage.service';
import { LocationService } from './common/services/location/location.service';
import { LoginService } from './login.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  private keyboardShowListener: any;
  private keyboardHideListener: any;
  backButtonSubscription: any;
  constructor(
    public loginService: LoginService,
    public storage: AppStorageService,
    private platform: Platform,
    private modalController: ModalController,
    private navCtrl: NavController,
    public locationService: LocationService
  ) {
    this.storage.init()
    // this.loginService.splashLogin()
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(async() => {
      ScreenOrientation.lock({ orientation: 'portrait' });
      Keyboard.setScroll({ isDisabled: true });
      this.keyboardShowListener = Keyboard.addListener('keyboardWillShow', () => {
        document.body.classList.add('keyboard-is-open');
      });

      this.keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => {
        document.body.classList.remove('keyboard-is-open');
      });


      this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, async () => {
        let topModal = await this.modalController.getTop();

        if (topModal) {
          this.modalController.dismiss();
          return;
        }
        this.navCtrl.back();

      });


      const platform = Capacitor.getPlatform();

      if (platform === 'android') {
        try {
          // Set StatusBar style and background color
          StatusBar.setStyle({ style: Style.Light });
          StatusBar.setOverlaysWebView({ overlay: false })
          StatusBar.setBackgroundColor({ color: '#ffffff' });
        } catch (err) {
          console.error('Error setting status bar:', err);
        }

        // await this.checkAndRequestGeolocation();
        try {
          const permissions = await this.locationService.checkPermissions();

          if (permissions.location !== 'granted') {
            console.log('Location permission not granted, requesting...');
            const requestResult = await this.locationService.requestPermissions();

            if (requestResult.location !== 'granted') {
              throw new Error('Location permission denied. Cannot start location tracking.');
            }
          }



        } catch (error) {
          console.error('Failed to start location tracking:', error);
          throw error;
        }
      }

      SplashScreen.hide();
      setTimeout(() => {
        this.loginService.init();
      }, 400);


    });
  }

 

  ngOnDestroy() {
    if (this.keyboardShowListener) {
      this.keyboardShowListener.remove();
    }
    if (this.keyboardHideListener) {
      this.keyboardHideListener.remove();
    }
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }
}