import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  deviceID:any = "";
  deviceInfo:any = {
    name: "",
    model: "",
    platform: "",
    operatingSystem: "",
    osVersion: "",
  }
  constructor() { }

  async init() {
    const deviceId = await Device.getId();
    // this.deviceID = deviceId;
    this.deviceID = deviceId.identifier;
    const deviceInfo = await Device.getInfo();
    this.deviceInfo.name = deviceInfo.name;
    this.deviceInfo.model = deviceInfo.model;
    this.deviceInfo.platform = deviceInfo.platform;
    this.deviceInfo.operatingSystem = deviceInfo.operatingSystem;
    this.deviceInfo.osVersion = deviceInfo.osVersion;
  }
}
