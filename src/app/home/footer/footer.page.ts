import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
  standalone: false
})
export class FooterPage implements OnInit {

  constructor(
    public router:Router
  ) { }

  ngOnInit() {
  }

  goToUserProfile(){
    this.router.navigate(['/home/user-profile'])
  }
  goToInprogress() {
    this.router.navigate(['/home/inprogress-job-orders']);
  }

  dashBoard(){
    this.router.navigate(['/home/dashboard'])
  }

}
