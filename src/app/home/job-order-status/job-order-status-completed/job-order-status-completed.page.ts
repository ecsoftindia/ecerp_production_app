import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-job-order-status-completed',
  templateUrl: './job-order-status-completed.page.html',
  styleUrls: ['./job-order-status-completed.page.scss'],
  standalone:false
})
export class JobOrderStatusCompletedPage implements OnInit {
  job = {
    jono: "JO-2025-001",
    date: "08 Sep 2025",
    product: "Precision Gear",
    id: "PRECITECHP001",
    machine: "Lathe Machine",
    operator: "John Doe",
    status: "Running",
    startTime: "10:45 AM"
  };
  
  constructor(
    public location:Location,
    private router:Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back()
  }

  async openQtyPopup() {
    const alert = await this.alertCtrl.create({
      header: 'Enter Quantity',
      inputs: [
        {
          name: 'qty',
          type: 'number',
          placeholder: 'Enter qty',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Submit',
          handler: (data:any) => {
            console.log('Submitted Qty:', data.qty);
            // 👉 Here you can call your API or save qty
          },
        },
      ],
    });

    await alert.present();
  }

}
