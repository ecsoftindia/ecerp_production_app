import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/common/config/api.service';
import { DataService } from 'src/app/common/services/data/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { UrlService } from 'src/app/common/services/url/url.service';
import { AppStorageService } from 'src/app/common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-inprogress-job-orders',
  templateUrl: './inprogress-job-orders.page.html',
  styleUrls: ['./inprogress-job-orders.page.scss'],
  standalone: false
})
export class InprogressJobOrdersPage {

  joborderlistreq: any = {
    joentryids: [],
    processitemcodes: [],
    machinecodes: [],
    operatorcodes: [],
    itemcode: '',
    onlyprocesspendingjo: 'YES',
    onlyprocessyn: 'YES',
    fromdate: '',
    todate: '',
    itemsperpage: '',
    currentpage: '1',
    sortby: '',
    sorttype: 'asc',
    joprocessstatuscodes: [],
    usercodes: [],
    itemcodes: [],
    itemgrcodes: []
  }

  getMachine: any = {
    searchitem: "",
    itemsperpage: "",
    currentpage: "",
    sortby: "",
    sorttype: "",
    itemtypecodes: ['12'],
    activeonly: ''
  }

  getEmployee: any = {
    itemsperpage: "",
    currentpage: "",
    searchitem: "",
    sorttype: "",
    sortby: "",
    department: "",
    dateofjoining: "",
    activeonly: ""
  }
  joborderstatus = [
    { name: 'Open', value: '1' },
    { name: 'InProcess', value: '2' },
    { name: 'WaitingforQC', value: '3' },
    { name: 'Completed', value: '4' },
    { name: 'Rejected', value: '5' },
    { name: 'Scrap', value: '6' },

  ];

  datas: any = []
  isModalOpenforPattern = false;
  processList: any = []
  machinedata: any = []
  empolyes: any = []
  itemsuser: any = []
  itemgrcodes: any = ''
  showProductImg: boolean = false;
  selectedDate: any;

  constructor(
    private router: Router,
    public location: Location,
    public apiService: ApiService,
    public data: DataService,
    public urlService: UrlService,
    public storage: AppStorageService
  ) { }

  ionViewDidEnter() {

    this.init()
  }

  async init() {
    await this.data.checkToken();
    await this.storage.get('selected_machine').then((val: any) => {
      if (val) {
        console.log(val)
        this.joborderlistreq.machinecodes = [val.machinecode];
        this.joborderlistreq.operatorcodes = [val.employeecode];
      }
    })
    this.getjoborderlist();
    this.getProcessList();
  }

  getjoborderlist() {

    this.apiService.joborderlistData(this.joborderlistreq).subscribe((success: any) => {
      if (success.Status) {
        this.datas = success.data

      } else {
        this.datas = []
      }

    })
  }


  goToDashboard() {
    this.router.navigate(['/home/dashboard'])
  }

  async goToJobOrderStatus(val: any) {
    console.log(val)
    const obj = {
      id: val
    }
    let id = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/job-order-status/' + id)
  }

  // goToJobOrderdetailed(){
  //   this.router.navigate(['/home/job-order-status' ])
  // }

  goBack() {
    this.location.back()
  }

  backstopage() {
    this.isModalOpenforPattern = false;
  }
  showDraw() {
    this.isModalOpenforPattern = true;
  }

  getProcessList() {
    this.apiService.getProcessItemsList({}).subscribe((success: any) => {
      if (success.Status) {
        this.processList = success.data;
      } else {
        this.processList = []
      }
    })
    this.getDatamachines()
  }

  getDatamachines() {
    this.apiService.getItems(this.getMachine).subscribe((success) => {
      if (success.Status === true) {

        this.machinedata = success.data;
      } else {
        this.machinedata = [];
      }
    })
    this.getDataopertors()
  }

  getDataopertors() {
    this.apiService.getEmployeeList(this.getEmployee).subscribe((success) => {
      if (success.Status === true) {
        this.empolyes = success.data;
      } else {
        this.empolyes = [];
      }
    })
    this.getDatausers()
  }

  getDatausers() {
    this.apiService.getInfo('users').subscribe((success) => {
      if (success.Status === true) {
        this.itemsuser = success.data;
      } else {
        this.itemsuser = [];
      }
    });
  }

  onToggleChange(event: any) {
    if (event.checked) {
      this.showProductImg = true
    } else {
      this.showProductImg = false
    }
  }

  clearAll() {
    // this.showjobno = '';
    // this.showpono = '';
    this.joborderlistreq = {
      joentryids: [],
      processitemcodes: [],
      itemcode: '',
      onlyprocesspendingjo: '',
      onlyprocessyn: 'YES',
      fromdate: '',
      todate: '',
      itemsperpage: '',
      currentpage: '1',
      sortby: '',
      sorttype: 'asc',
      machinecodes: [],
      operatorcodes: [],
      joprocessstatuscodes: [],
      usercodes: [],
      itemcodes: [],
      itemgrcodes: []
    }
    // this.searchItem3 = '',
    this.itemgrcodes = ''

  }

  applyFilter() {
    this.joborderlistreq.itemgrcodes = []
    this.joborderlistreq.itemgrcodes = this.itemgrcodes ? [this.itemgrcodes] : []
    this.joborderlistreq.processitemcodes =
      this.joborderlistreq.processitemcodes && this.joborderlistreq.processitemcodes.length > 0
        ? this.joborderlistreq.processitemcodes : [];
    this.joborderlistreq.machinecodes = this.joborderlistreq.machinecodes && this.joborderlistreq.machinecodes.length > 0
      ? this.joborderlistreq.machinecodes : [];
    this.joborderlistreq.operatorcodes = this.joborderlistreq.operatorcodes && this.joborderlistreq.operatorcodes.length > 0
      ? this.joborderlistreq.operatorcodes : [];
    this.joborderlistreq.joprocessstatuscodes = this.joborderlistreq.joprocessstatuscodes && this.joborderlistreq.joprocessstatuscodes.length > 0
      ? this.joborderlistreq.joprocessstatuscodes : [];
    this.joborderlistreq.usercodes = this.joborderlistreq.usercodes && this.joborderlistreq.usercodes.length > 0
      ? this.joborderlistreq.usercodes : [];

    this.joborderlistreq.currentpage = '1';
    this.getjoborderlist();
    this.isModalOpenforPattern = false;

  }




}
