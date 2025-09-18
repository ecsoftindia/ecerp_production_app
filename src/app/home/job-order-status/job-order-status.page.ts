import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/common/services/data/data.service';
import { UrlService } from 'src/app/common/services/url/url.service';
@Component({
  selector: 'app-job-order-status',
  templateUrl: './job-order-status.page.html',
  styleUrls: ['./job-order-status.page.scss'],
  standalone:false
})
export class JobOrderStatusPage  {

  id:any;
  id1:any;
  processinfo:any=[]
  
  constructor(
    public location:Location,
    private router:Router,
    public route: ActivatedRoute,
    public data: DataService,
    public urlService: UrlService,
  ) { 
    this.route.paramMap.subscribe(params => {
      // fetch your new parameters here, on which you are switching the routes and call ngOnInit()
      this.init();
    });
  }

  ionViewDidEnter() {

  }
  
  async init(){
     await this.data.checkToken()

     let id = this.route.snapshot.paramMap.get('id');
     this.id1 = await this.urlService.decode(id);
     this.id = this.id1.id;
     console.log(this.id)
     this.processinfo = this.id.processinfo
     console.log(this.processinfo)
  }


  goBack(){
    this.location.back()
  }


  goToJobOrderdetailed(){
    this.router.navigate(['/home/job-order-status-detail'])
 }

 getStatusName(joqty: any, val: any, qtyinfo: { completed: string; inprocess: string; open: string; qcpending: string, qcpassed: string; rejected: string; scrap: string }): any {
  if (!qtyinfo) return '';
  // console.log(joqty , '',qtyinfo.qcpassed) 
  // Convert values to numbers and check

  if (+qtyinfo.rejected > 0) {
    return 'Rejected';
  }

  if (+qtyinfo.scrap > 0) {
    return 'Scrap';
  }


  if ((+qtyinfo.completed > 0 && +qtyinfo.qcpending === 0 && val.insyn === 'YES' && +qtyinfo.qcpassed === +joqty)
    || (+qtyinfo.completed > 0 && val.insyn === 'NO' && +joqty === +qtyinfo.completed)) {
    return 'Completed';
  }
  if (+qtyinfo.inprocess > 0) {
    return 'In Process';
  }
  if (+qtyinfo.open > 0) {
    return 'Open';
  }
  if (+qtyinfo.qcpending > 0 && +qtyinfo.completed > 0) {
    return 'For Inspection'
  }
  return 'Open';
}

getQtyValue(joqty: any, val: any, qtyinfo: any): any {
  const status = this.getStatusName(joqty, val, qtyinfo);
  if (status === 'In Process') {
    return qtyinfo.inprocess;
  }
  if (status === 'Open') {
    return qtyinfo.open;
  }
  if (status === 'For Inspection') {
    return qtyinfo.qcpending;
  }

  // If status is Inspection → return qcpasse

  // Else → return open
  return qtyinfo?.open;
}

shouldShowSection(qtyinfo: any, joqty: number, val: any): boolean {

  if (
    +joqty === +qtyinfo?.open ||
    +joqty === +qtyinfo?.inprocess ||
    +joqty === +qtyinfo?.rejected ||
    +joqty === +qtyinfo?.scrap
  ) {
    return true
  }
  else if (val?.insyn === 'YES' && +joqty === +qtyinfo.qcpassed) {
    return true;
  }
  else if (val?.insyn === 'NO' && +joqty === +qtyinfo.completed) {
    return true;
  }
  else if (val?.insyn === 'YES' && +joqty === +qtyinfo.qcpending) {
    return true;
  }

  return false;




}

shouldHideSection(qtyinfo: any, joqty: number, val: any): boolean {
  if (
    +joqty === +qtyinfo?.open ||
    +joqty === +qtyinfo?.inprocess ||
    +joqty === +qtyinfo?.rejected ||
    +joqty === +qtyinfo?.scrap
  ) {
    return false
  }
  else if (val?.insyn === 'YES' && +joqty === +qtyinfo.qcpassed) {
    return false;
  }
  else if (val?.insyn === 'NO' && +joqty === +qtyinfo.completed) {
    return false;
  }
  else if (val?.insyn === 'YES' && +joqty === +qtyinfo.qcpending) {
    return false;
  }

  return true;


}

getOperatorArrayByQty(process: any) {
  const qty = process?.qtyinfo || {};
  if (+qty.open > 0) return process?.operatorinfo || [];
  if (+qty.inprocess > 0) return process?.operatorinfo_inprocess || [];
  if (+qty.completed > 0 && +qty.qcpending === 0) return process?.operatorinfo_completed || [];
  if (+qty.qcpending > 0 && +qty.completed > 0) return process?.operatorinfo_qc || [];
  // all zero case
  return process?.operatorinfo || [];
}

getFirstMachineName(process: any): string {
  const qty = process?.qtyinfo || {};
  if (+qty.open > 0) return process?.machineinfo?.[0]?.machinename || 'N/A';
  if (+qty.inprocess > 0) return process?.machineinfo_inprocess?.[0]?.machinename || 'N/A';
  if (+qty.completed > 0 && +qty.qcpending === 0) return process?.machineinfo_completed?.[0]?.machinename || 'N/A';
  if (+qty.qcpending > 0 && +qty.completed > 0) return process?.machineinfo_qc?.[0]?.machinename || 'N/A';
  // all zero case
  return process?.machineinfo?.[0]?.machinename || 'N/A';
}

getMachineCount(process: any): number {
  const qty = process?.qtyinfo || {};
  if (+qty.open > 0) return process?.machineinfo?.length || 0;
  if (+qty.inprocess > 0) return process?.machineinfo_inprocess?.length || 0;
  if (+qty.completed > 0 && +qty.qcpending === 0) return process?.machineinfo_completed?.length || 0;
  if (+qty.qcpending > 0 && +qty.completed > 0) return process?.machineinfo_qc?.length || 0;
  return process?.machineinfo?.length || 0;
}

 
}
