import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-job-order-detailed',
  templateUrl: './job-order-detailed.page.html',
  styleUrls: ['./job-order-detailed.page.scss'],
  standalone:false
})
export class JobOrderDetailedPage implements OnInit {

  constructor(
    public location:Location
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back()
  }

}
