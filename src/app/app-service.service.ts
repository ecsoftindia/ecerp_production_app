import { Injectable } from '@angular/core';
import {  entUserData } from './common/config/app.classes';
import { AppStorageService } from './common/services/app-storage/app-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  userData = new entUserData();
  constructor(public storage: AppStorageService) { }

}
