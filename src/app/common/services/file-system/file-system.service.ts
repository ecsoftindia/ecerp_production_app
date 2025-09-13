import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { AlertController } from '@ionic/angular';
import { NativeSettingsService } from '../native-settings/native-settings.service';
import { DeviceService } from '../device/device.service';
import { FileOpener } from '@capacitor-community/file-opener';


@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(
    public alertController: AlertController,
    public nativeSettings: NativeSettingsService,
    public device: DeviceService
  ) {
    this.device.init();
  }
//OLD

  // async checkPermission(type: string): Promise<boolean> {
  //   let permission = await Filesystem.checkPermissions();
  //   if (permission.publicStorage === 'denied') {
  //     console.log(permission.publicStorage, 'permission.publicStorage');
  //     this.informUser();
  //     return false;
  //   }
  //   return true;
  // }

  // async requestPermission(type: string): Promise<boolean> {
  //   let permission = await Filesystem.requestPermissions();
  //   if (permission.publicStorage === 'denied') {
  //     this.informUser();
  //     return false;
  //   }
  //   return true;
  // }

  // async fetchAndWriteFile(val: any, filename: any): Promise<boolean> {
  //   try {
  //     const response = await fetch("data:application/pdf;base64," + val);
  //     const blob = await response.blob();
  //     console.log(response);

  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onloadend = async () => {
  //         try {
  //           let writeFile: any = await this.writeFile(filename, reader.result);
  //           if (writeFile) {
  //             this.openFile(writeFile.uri, blob.type);
  //             resolve(true);
  //           } else {
  //             resolve(false);
  //           }
  //           resolve(true);
  //         } catch (error) {
  //           resolve(false);
  //         }
  //       };
  //       reader.onerror = () => {
  //         resolve(false);
  //       };
  //       reader.readAsDataURL(blob);
  //     });
  //   } catch (error) {
  //     return false;
  //   }
  // }


  // async writeFile(path: any, data: any) {
  //   return new Promise(async (resolve) => {
  //     const savedFile = await Filesystem.writeFile({
  //       path: path,
  //       data,
  //       directory: Directory.Data,
  //     });
  //     resolve(savedFile);
  //   });
  // }


  // openFile(path: any, type: any) {
  //   FileOpener.open({
  //     filePath: path,
  //     contentType: type,
  //     openWithDefault: true
  //   });
  // }


  async checkPermission(): Promise<boolean> {
    let permission = await Filesystem.checkPermissions();
    console.log(permission);
    if (permission.publicStorage === 'denied') {
      console.log(permission.publicStorage, 'permission.publicStorage');
      this.informUser();
      return false;
    }
    return true;
  }

  async requestPermission(): Promise<boolean> {
    let permission = await Filesystem.requestPermissions();
    console.log(permission);
    if (permission.publicStorage === 'denied') {
      this.informUser();
      return false;
    }
    return true;
  }

  async fetchAndWriteFile(val: any, filename: any): Promise<boolean> {
    try {
      const response = await fetch("data:application/pdf;base64," + val);
      const blob = await response.blob();
      console.log(response);

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            let writeFile: any = await this.writeFile(filename, reader.result);
            if (writeFile) {
              this.openFile(writeFile.uri, blob.type);
              resolve(true);
            } else {
              resolve(false);
            }
            resolve(true);
          } catch (error) {
            resolve(false);
          }
        };
        reader.onerror = () => {
          resolve(false);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      return false;
    }
  }


  async writeFile(path: any, data: any) {
    return new Promise(async (resolve) => {
       let permission = await this.checkPermission();
      if (!permission) {
        let requestPermission = await this.requestPermission();
        if (!requestPermission) {
          resolve(false);
        }
      }
      const savedFile = await Filesystem.writeFile({
        path: path,
        data,
        directory: Directory.Documents,
      });
      console.log(savedFile)
      resolve(savedFile);
    });
  }

  async openFile(path: any, type: any) {
    try {
      await FileOpener.open({
        filePath: path,
        contentType: type,
        openWithDefault: true
      });
    } catch (error) {
      console.error('Error opening file', error);
    }
  }

  informUser() {
    if (this.device.deviceInfo.platform === 'android') {
      this.informAndroidUser();
    } else if (this.device.deviceInfo.platform === 'ios') {
      this.informIOSUser();
    }
  }



  async informAndroidUser() {
    console.log('inform Android user')
    const alert = await this.alertController.create({
      header: 'Permission Request',
      message: "Oops! It looks like you denied file read and write permission earlier. To continue, you will need to enable this permission for our app in your app settings. Click 'OK' to be redirected to your app settings, then select 'Permission' > 'File' > 'Allow only while using the app'. Thank you!",
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.nativeSettings.open();
        }
      }],
    });
    await alert.present();
  }

  async informIOSUser() {
    const alert = await this.alertController.create({
      header: 'Permission Request',
      message: "Oops! It looks like you denied location permission earlier.",
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.nativeSettings.open();
        }
      }],
    });
    await alert.present();
  }



  // checkPermissions() {
  //   return new Promise((resolve) => {
  //     Filesystem.checkPermissions().then(async (val) => {

  //       if (val.publicStorage === 'granted') {
  //         resolve(true)
  //       } else {
  //         resolve(false);
  //       }
  //     })
  //   })
  // }

  // requestPermissions() {

  //   return new Promise((resolve) => {
  //     Filesystem.requestPermissions().then((val) => {
  //       if (val.publicStorage === 'granted') {
  //         resolve(true);
  //       } else {
  //         // this.presentAlert();
  //         resolve(false);
  //       }
  //     })
  //   })
  // }

  // async presentAlert() {
  //   return new Promise(async (resolve) => {
  //   const alert = await this.alert.create({
  //     header: 'Permission Access Request',
  //     message: 'File write and read permission required to create DB Back up. System will prompt you with request for access. Do not deny the request.',
  //     buttons: [
  //       {
  //         text: 'OK',
  //         role: 'confirm',
  //         handler: async () => {
  //           resolve(true);
  //         },
  //       },
  //     ],
  //   });
  //   await alert.present();
  // });
  // }

  // async errorAlert() {
  //   return new Promise(async (resolve) => {
  //   const alert = await this.alert.create({
  //     header: 'Permission Denied',
  //     message: 'File write and read permission denied by the user. cannot proceed further. contact System Administrator.',
  //     buttons: [
  //       {
  //         text: 'OK',
  //         role: 'confirm',
  //         handler: async () => {
  //           resolve(true);
  //         },
  //       },
  //     ],
  //   });
  //   await alert.present();
  // });
  // }

  // checkDirectoryPath(path, directory){
  //   return new Promise(async(resolve)=>{
  //     let checkDirectory = await Filesystem.readdir({
  //       path: path,
  //       directory: directory
  //     }).then((success)=>{
  //       resolve(true);
  //     }, (error)=>{
  //       resolve(false);
  //     });
  //   })
  // }

  // createDirectoryPath(path, directory, recursive){
  //   return new Promise(async(resolve)=>{
  //     let checkDirectory = await Filesystem.mkdir({
  //       path: path,
  //       directory: directory,
  //       recursive: recursive
  //     }).then((success)=>{
  //       resolve(true);
  //     }, (error)=>{
  //       resolve(false);
  //     });
  //   })
  // }

  // writeFile(path, data, directory, recursive){
  //   return new Promise(async(resolve)=>{
  //     let checkDirectory = await Filesystem.writeFile({
  //       path: path,
  //       data:data,
  //       directory: directory,
  //       encoding: Encoding.UTF8,
  //       recursive: recursive
  //     }).then((success)=>{
  //       resolve(true);
  //     }, (error)=>{
  //       resolve(false);
  //     });
  //   })
  // }

  // removeDirectoryPath(path, directory, recursive){
  //   return new Promise(async(resolve)=>{
  //     let checkDirectory = await Filesystem.rmdir({
  //       path: path,
  //       directory: directory,
  //       recursive: recursive
  //     }).then((success)=>{
  //       resolve(true);
  //     }, (error)=>{
  //       resolve(false);
  //     });
  //   })
  // }

}
