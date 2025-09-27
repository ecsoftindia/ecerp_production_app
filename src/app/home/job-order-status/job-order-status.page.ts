import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/common/services/data/data.service';
import { UrlService } from 'src/app/common/services/url/url.service';
import { ApiService } from 'src/app/common/config/api.service';
import { AppStorageService } from 'src/app/common/services/app-storage/app-storage.service';
@Component({
  selector: 'app-job-order-status',
  templateUrl: './job-order-status.page.html',
  styleUrls: ['./job-order-status.page.scss'],
  standalone: false
})
export class JobOrderStatusPage {

  id: any;
  id1: any;
  processinfo: any = []
  processColumns: string[] = [];
  processList: any = []

  constructor(
    public location: Location,
    private router: Router,
    public route: ActivatedRoute,
    public data: DataService,
    public urlService: UrlService,
    public apiService: ApiService,
    public storage: AppStorageService
  ) {
    this.route.paramMap.subscribe(params => {
      // fetch your new parameters here, on which you are switching the routes and call ngOnInit()
      this.init();
    });
  }

  ionViewDidEnter() {

  }

  async init() {
    await this.data.checkToken();

    let id = this.route.snapshot.paramMap.get('id');
    this.id1 = await this.urlService.decode(id);
    this.id = this.id1.id;
    console.log(this.id)
    this.processinfo = this.id.processinfo
    console.log(this.processinfo)
    const maxProcessCount = Math.max(this.processinfo?.length ?? 0);
    // Generate dynamic process column names
    this.processColumns = Array.from({ length: maxProcessCount }, (_, i) => `processes${i}`);



    this.getProcessList();

  }


  goBack() {
    this.location.back()
  }


  goToJobOrderdetailed() {
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

  formatDurationMins(mins: number | string): string {
    mins = +mins; // Ensure it's a number
    if (isNaN(mins) || mins < 1) {
      return '0 mins';
    }
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    // Examples: 1 hr 2 mins, or just 3 hrs, or just 7 mins
    return [
      h ? `${h} hr${h > 1 ? 's' : ''}` : '',
      m ? `${m} min${m > 1 ? 's' : ''}` : ''
    ].filter(Boolean).join(' ');
  }

  async openJobOrderdetailed(val: any, val2: any, val3: any, qty: any) {
    console.log(qty)

    if (val.osrcyn === 'YES') {
      return;
    }


    const { inprocess, completed, open, qcpassed, qcpending } = val.qtyinfo ?? {};
    if ([inprocess, completed, open, qcpassed, qcpending].every(v => +v === 0)) {
      this.data.openAlertFalse('Previous process not yet completed');
      return;
    }



    if (
      val.insyn === 'YES' &&
      +val.qtyinfo.completed > 0 &&
      +val.qtyinfo.qcpassed > 0 &&
      +val.qtyinfo.completed === +val.qtyinfo.qcpassed && +val.qtyinfo.qcpassed === +val2.joqty
    ) {
      return;
    }


    if (val.insyn === 'NO' && +val.qtyinfo.completed > 0 && +val2.joqty === +val.qtyinfo.completed) {
      return;
    }

    let from = ''
    from = val3



    const obj = {
      from: from,
      dirConvertion: true,
      processentry: val,
      processdetail: val2,
      qty: qty,
      processList: this.processList,
      processid: this.id

    }
    let id = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/job-order-status-detail/' + id)

  }

  async openJobOrderdetaileds(val: any, val2: any, val3: any, qty: any) {

    console.log(val3)

    if (val3 !== 'processcompleted' && val3 !== 'processplan' ) {
      return;
    }

    if (val?.osrcyn === 'YES') {
      return;
    }

    if (+val?.qtyinfo.rejected > 0 || +val?.qtyinfo.scrap > 0) {
      return;
    }


    const { inprocess, completed, open, qcpassed, qcpending } = val?.qtyinfo || {};
    if ([inprocess, completed, open, qcpassed, qcpending].every(v => +v === 0)) {
      this.data.openAlertFalse('Previous process not yet completed');
      return;
    }



    if (
      val?.insyn === 'YES' &&
      +val?.qtyinfo.completed > 0 &&
      +val?.qtyinfo.qcpassed > 0 &&
      +val?.qtyinfo.completed === +val?.qtyinfo.qcpassed && +val?.qtyinfo.qcpassed === +val2?.joqty
    ) {
      return;
    }


    if (val?.insyn === 'NO' && +val?.qtyinfo.completed > 0 && +val2?.joqty === +val?.qtyinfo.completed) {
      return;
    }

    let from = ''
    from = val3
    // if (+val.qtyinfo.inprocess > 0) {
    //   from = 'processcompleted'
    // }
    // if (+val.qtyinfo.open > 0) {
    //   from = 'processplan'
    // }
    // if (+val.qtyinfo.qcpending > 0 && +val.qtyinfo.completed > 0) {
    //   from = 'inspection'
    // }




    const obj = {
      from: from,
      dirConvertion: true,
      processentry: val,
      processdetail: val2,
      qty: qty,
      processList: this.processList,
      processid: this.id

    }
    let id = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/job-order-status-detail/' + id)

  }

  getStatusAction(joqty: any, val: any, qtyinfo: any): string {
    console.log(joqty, val, qtyinfo)
    console.log(this.getStatusName(joqty, val, qtyinfo));
    const status = this.getStatusName(joqty, val, qtyinfo);

    if (status === 'In Process') {
      return 'processcompleted';
    }

    if (status === 'Open') {
      return 'processplan';
    }


    if (status === 'For Inspection') {
      return 'inspection';
    }
    return status.toLowerCase().replace(' ', '');
  }

  getProcessList() {
    this.apiService.getProcessItemsList({}).subscribe((success: any) => {
      if (success.Status) {
        this.processList = success.data;
      } else {
        this.processList = []
      }
    })
  }

  getQtyStatusClass(
    qtyinfo: { completed: string; inprocess: string; open: string; qcpending: string; rejected: string; scrap: string },
    val: any
  ): string {
    if (!qtyinfo) {

      return 'back-grnd-clr';
    }

    // 🔹 Highest priority first
    if (+qtyinfo.rejected > 0) {
      return 'rejected-back-clr';
    }

    if (+qtyinfo.scrap > 0) {
      return 'scrap-back-clr';
    }

    if (+qtyinfo.open > 0) {
      return 'back-grnd-clr'; // blue
    }

    if (+qtyinfo.inprocess > 0) {
      return 'backclrwi8'; // yellow
    }

    if (+qtyinfo.completed > 0 && +qtyinfo.qcpending === 0) {
      return 'completeback'; // green
    }

    if (+qtyinfo.qcpending > 0 && +qtyinfo.completed > 0) {
      return 'reworkback';
    }

    return 'back-grnd-clr'; // default
  }




}
