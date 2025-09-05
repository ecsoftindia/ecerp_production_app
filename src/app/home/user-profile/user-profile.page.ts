import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone:false
})
export class UserProfilePage implements OnInit {

  constructor(
    public location:Location
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back()
  }

}
