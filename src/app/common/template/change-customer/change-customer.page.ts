import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ApiService } from '../../config/api.service';

@Component({
  selector: 'app-change-customer',
  templateUrl: './change-customer.page.html',
  styleUrls: ['./change-customer.page.scss'],
})
export class ChangeCustomerPage implements OnInit {
  customerlist = false;
  searchtype: any = '';
  searchtext: any = '';
  custList: any = [];
  SIndex: any;
  currentpage: any = '1';
  constructor(
    public data: DataService,
    public apiService: ApiService
  ) { }

  ngOnInit() {
    // this.getList()
  }

  process() {
    this.customerlist = true
    this.getList()
  }

  getList() {
    const obj = {
      searchtext: this.searchtext,
      searchtype: this.searchtype,
      searchmethod: 'STANDARD',
      includeunapprovedcustomers: 'NO',
      itemsperpage: '10',
      currentpage: this.currentpage
    }
    this.apiService.getCustomers(obj).subscribe((success: any) => {
      if (success.Status) {
        this.custList = success.data
      }
    })
  }

  loadMore(event: any) {
    this.currentpage++;
    const obj = {
      searchtext: this.searchtext,
      searchtype: this.searchtype,
      searchmethod: 'STANDARD',
      includeunapprovedcustomers: 'NO',
      itemsperpage: '10',
      currentpage: this.currentpage.toString()
    }
    this.apiService.getCustomers(obj).subscribe((success: any) => {
      if (success.Status === true) {
        this.custList = this.custList.concat(success.data);
      }
      event.target.complete();
    }, () => {
      event.target.complete();
    });
  }

  changeCust(val: any) {
    this.SIndex = val;
  }

  onSubmit() {
  }

}
