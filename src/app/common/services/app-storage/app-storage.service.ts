import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/app.config';

// import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {
  dbName = AppConfig.dbname;
  logindata=[];
  constructor(
    private storage: Storage,
  ) { }

  async init() {
    await this.storage.create();
  }

  async encrypt(key: string): Promise<string> {
    return new Promise((resolve) => {
      const obj = {
        data: key
      }
      let response = encodeURIComponent(btoa(JSON.stringify(obj)));
      resolve(response);
    });
  }

  async decrypt(value: any): Promise<string> {
    return new Promise((resolve) => {
      const urlJson = atob(decodeURIComponent(value));
      const urlValue = JSON.parse(urlJson);
      resolve(urlValue.data);
    });
  }

  set(key: string, value: any): Promise<any> {
    return new Promise(async (resolve) => {
      let encrptKey = await this.encrypt(key);
      let encrptValue = await this.encrypt(value);
      this.storage.set(encrptKey, encrptValue).then((success:any) => {
        resolve(success);
      });
    });
  }

  get(key: string): Promise<any> {
    return new Promise(async (resolve) => {
      let encrptKey = await this.encrypt(key);
      this.storage.get(encrptKey).then(async (val) => {
        if (val) {
          let decrptValue = await this.decrypt(val);
          resolve(decrptValue);
        } else {
          resolve(val);
        }
      });
    });
  }
  remove(key: string): Promise<any> {
    return new Promise(async (resolve) => {
      let encrptKey = await this.encrypt(key);
      this.storage.remove(encrptKey).then((val) => {
        resolve(val);
      });
    });
  }
  clear(): Promise<any> {
    return new Promise(async (resolve) => {
      this.storage.clear().then((val: any) => {
        resolve(val);
      });
    });
  }
}
