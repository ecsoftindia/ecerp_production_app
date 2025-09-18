import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/common/config/api.service';
import { DataService } from 'src/app/common/services/data/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { UrlService } from 'src/app/common/services/url/url.service';

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

  datas: any = []


  constructor(
    private router: Router,
    public location: Location,
    public apiService: ApiService,
    public data: DataService,
    public urlService: UrlService,
  ) { }

  ionViewDidEnter() {

    this.init()
  }

  async init() {
    await this.data.checkToken();
    this.getjoborderlist();
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

}
