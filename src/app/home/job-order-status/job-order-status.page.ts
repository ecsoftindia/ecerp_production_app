import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-order-status',
  templateUrl: './job-order-status.page.html',
  styleUrls: ['./job-order-status.page.scss'],
  standalone:false
})
export class JobOrderStatusPage implements OnInit {

  constructor(
    public location:Location,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back()
  }


  goToJobOrderdetailed(){
    this.router.navigate(['/home/job-order-status-detail'])
 }
 
}
