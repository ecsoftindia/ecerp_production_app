import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inprogress-job-orders',
  templateUrl: './inprogress-job-orders.page.html',
  styleUrls: ['./inprogress-job-orders.page.scss'],
  standalone:false
})
export class InprogressJobOrdersPage implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  goToDashboard(){
     this.router.navigate(['/home/dashboard'])
  }

}
