import { Injectable } from '@angular/core';
import { NativeSettings, AndroidSettings, IOSSettings } from 'capacitor-native-settings';

@Injectable({
  providedIn: 'root'
})
export class NativeSettingsService {

  constructor() { }

  open() {
    NativeSettings.open({
      optionAndroid: AndroidSettings.ApplicationDetails,
      optionIOS: IOSSettings.App
    }).then((val) => {
      console.log(val);
    })
  }
}
