import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-order-status-detail',
  templateUrl: './job-order-status-detail.page.html',
  styleUrls: ['./job-order-status-detail.page.scss'],
  standalone:false
})
export class JobOrderStatusDetailPage implements OnInit {
  isEditing = false;

  machines = ["Lathe Machine", "Milling Machine"];
  operators = ["John Doe", "Mary Smith"];
  qty = 150;
  
  allMachines = ["Lathe Machine", "Milling Machine", "Drill Press", "CNC Machine"];
  allOperators = ["John Doe", "Mary Smith", "Alex Lee", "Sophia Ray"];
  constructor(
    public location:Location,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back()
  }


  goToJobOrdercompleted(){
    this.router.navigate(['/home/job-order-status-completed'])
 }
 
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
