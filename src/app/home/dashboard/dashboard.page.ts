import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/common/config/api.service';
import { DataService } from 'src/app/common/services/data/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  processList: any = [];
  datas: any = [];

  joborderlistreq: any = {
    joentryids: [],
    processitemcodes: [],
    machinecodes: [],
    operatorcodes: [],
    itemcode: '',
    onlyprocesspendingjo: '',
    onlyprocessyn: 'YES',
    fromdate: '',
    todate: '',
    itemsperpage: '',
    currentpage: '1',
    sortby: '',
    sorttype: 'asc',
    joprocessstatuscodes: [],
    usercodes: [],
  }

  status: any = [
    { name: 'Open', statuscount: '', value: '1' },
    { name: 'In-Process', statuscount: '', value: '2' },
    { name: 'Waiting for QC', statuscount: '', value: '3' },
    { name: 'Completed', statuscount: '', value: '4' },
    { name: 'Rejected', statuscount: '', value: '5' },
    { name: 'Scrap', statuscount: '', value: '6' },
  ];



  constructor(
    private router: Router,
    public apiService: ApiService,
    public data: DataService,
  ) { }

  ngOnInit() {

    this.init();

  }

  async init() {
    await this.data.checkToken();
    await this.getProcessList()
    this.getjoborderlist();
  }

  getProcessList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.getProcessItemsList({}).subscribe({
        next: (success: any) => {
          if (success.Status) {
            this.processList = success.data;
            resolve(true);
          } else {
            this.processList = [];
            reject('Failed to load process items');
          }
        },
        error: (err) => {
          this.processList = [];
          reject(err);
        }
      });
    });



  }

  getjoborderlist() {
    this.apiService.joborderlistData(this.joborderlistreq).subscribe((success: any) => {
      this.datas = success.Status ? success.data : [];
      this.updateStatusCounts();
    });
  }

  updateStatusCounts() {
    // reset first
    this.status.forEach((s: any) => s.statuscount = 0);

    this.datas.forEach((job: any) => {
      if (job.processinfo && job.processinfo.length) {
        job.processinfo.forEach((proc: any) => {
          const qty = proc.qtyinfo;

          if (qty) {
            // add to Open
            const open = this.status.find((s: any) => s.name === 'Open');
            if (open) open.statuscount += Number(qty.open || 0);

            // add to In-Process
            const inprocess = this.status.find((s: any) => s.name === 'In-Process');
            if (inprocess) inprocess.statuscount += Number(qty.inprocess || 0);

            // add to Waiting for QC
            const waiting = this.status.find((s: any) => s.name === 'Waiting for QC');
            if (waiting) waiting.statuscount += Number(qty.qcpending || 0);

            // add to Completed
            const completed = this.status.find((s: any) => s.name === 'Completed');
            if (completed) {
              if (proc.insyn === 'YES') {
                // currently in process → add qcpassed
                completed.statuscount += Number(qty.qcpassed || 0);
              } else {
                // insyn NO → add completed
                completed.statuscount += Number(qty.completed || 0);
              }
            }

            const rejected = this.status.find((s: any) => s.name === 'Rejected');
            if (rejected) rejected.statuscount += Number(qty.rejected || 0);

            const scrap = this.status.find((s: any) => s.name === 'Scrap');
            if (scrap) scrap.statuscount += Number(qty.scrap || 0);
          }
        });
      }
    });
  }

  goToInprogress() {
    this.router.navigate(['/home/inprogress-job-orders']);
  }

}
