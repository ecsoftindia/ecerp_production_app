import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-select-machine',
  templateUrl: './select-machine.page.html',
  styleUrls: ['./select-machine.page.scss'],
  standalone:false
})
export class SelectMachinePage implements OnInit {

  constructor(
    private location:Location,
    public router:Router
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back()
  }

  goToDashboard(){
    this.router.navigate(['/home/dashboard'])
  }

}
