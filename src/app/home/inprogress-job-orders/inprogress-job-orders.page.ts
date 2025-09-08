import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-inprogress-job-orders',
  templateUrl: './inprogress-job-orders.page.html',
  styleUrls: ['./inprogress-job-orders.page.scss'],
  standalone:false
})
export class InprogressJobOrdersPage implements OnInit {

  constructor(
    private router:Router,
    public location:Location
  ) { }

  ngOnInit() {
  }

  goToDashboard(){
     this.router.navigate(['/home/dashboard'])
  }

  goToJobOrderdetailed(){
     this.router.navigate(['/home/job-order-status'])
  }

  goBack(){
    this.location.back()
  }

}
