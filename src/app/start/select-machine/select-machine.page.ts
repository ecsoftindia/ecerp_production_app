import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/common/config/api.service';
import { DataService } from 'src/app/common/services/data/data.service';
import { AppStorageService } from 'src/app/common/services/app-storage/app-storage.service';
@Component({
  selector: 'app-select-machine',
  templateUrl: './select-machine.page.html',
  styleUrls: ['./select-machine.page.scss'],
  standalone: false
})
export class SelectMachinePage implements OnInit {
  machinedata: any = [];
  machinecode: any = '';
  employeecode: any = '';
  employees: any = [];
  constructor(
    private location: Location,
    public router: Router,
    public apiService: ApiService,
    public data: DataService,
    public storage: AppStorageService
  ) { }

  ngOnInit() {
    this.init()
  }

  goBack() {
    this.location.back()
  }




  async init() {
    await this.data.checkToken()
    this.getDataopertors()
  }



  getDataopertors() {
    this.apiService.getEmployeeList({}).subscribe((success) => {
      if (success.Status === true) {
        this.employees = success.data;
      } else {
        this.employees = [];
      }
    })
    this.getDatamachines()
  }


  getDatamachines() {
    const obj = {
      itemtypecodes: ['12']
    }
    this.apiService.getItems(obj).subscribe((success) => {
      if (success.Status === true) {
        this.machinedata = success.data;
      } else {
        this.machinedata = [];
      }
    })
  }

  async goToDashboard() {
    if (this.employeecode == '') {
      this.data.openAlertFalse('Kindly select operator')
      return
    }

    if (this.machinecode == '') {
      this.data.openAlertFalse('Kindly select machine')
      return
    }

    const obj = {
      employeecode: this.employeecode,
      machinecode: this.machinecode,
      employeename: this.employees.find((e: any) => e.employeecode === this.employeecode)?.employeename,
    }
    await this.storage.set('selected_machine', obj)
    await this.router.navigate(['/home/dashboard'])
  }

}
