import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/common/services/data/data.service';
import { UrlService } from 'src/app/common/services/url/url.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/common/config/api.service';
@Component({
  selector: 'app-job-order-status-detail',
  templateUrl: './job-order-status-detail.page.html',
  styleUrls: ['./job-order-status-detail.page.scss'],
  standalone: false
})
export class JobOrderStatusDetailPage {
  isEditing = false;

  machines = ["Lathe Machine", "Milling Machine"];
  operators = ["John Doe", "Mary Smith"];
  qty = 150;

  allMachines = ["Lathe Machine", "Milling Machine", "Drill Press", "CNC Machine"];
  allOperators = ["John Doe", "Mary Smith", "Alex Lee", "Sophia Ray"];

  id: any;
  dirConvertion = false;

  //new
  newSerial: any = '';
  serialInputValue: string = '';
  selectedJobOrder: any = {
    refno: '',
    refentryid: '',
    reffinyearcode: '',
    items: [],
    processcode: ''
  }

  selectedItems: any = [];
  empolyes: any = [];
  filteredJobOrders: any[] = [];
  jobOrders: any = [];
  searchData: any = {
    joentryid: '',
    nextprocesscodes: [],
    orderentryid: '',
    customercode: '',
    itemcodes: []
  }
  machinedata: any = []
  getEmployee: any = {
    itemsperpage: "",
    currentpage: "",
    searchitem: "",
    sorttype: "",
    sortby: "",
    department: "",
    dateofjoining: "",
    activeonly: ""
  }

  getMachine: any = {
    searchitem: "",
    itemsperpage: "",
    currentpage: "",
    sortby: "",
    sorttype: "",
    itemtypecodes: ['12'],
    activeonly: ''
  }

  moreData: any = [];
  totalQty: any = '';
  acceptedQty = '';
  orgQty = '';
  orgAcceptedQty = '';
  rejectedQty = '';
  rejectedReason = '';

  reworkQty = '';
  reworkReason = '';

  scrapQty = '';
  scrapReason = '';
  showConsumedProducts = false;
  persons = ['John Doe', 'Ravi Kumar', 'Meena Singh', 'Meena Singh', 'Meena Singh'];


  starttime: any = ''
  quantity: any;
  employees: any;
  serialno: any;
  displayedColumns: string[] = [
    'sno',
    'itemInfo',
    'qty',
    'action',
    // add other existing columns here
  ];



  responseData: any;
  from: any = '';
  dataSource = new MatTableDataSource<any>([]);  // Initialize with an empty array
  searchText: any = '';
  btnClicked = false;
  itemDetails: any;
  selectedItem: any;
  godownCode: any = '';
  salesData: any;
  @ViewChild('table') table!: MatTable<any>;

  mode: any = '';
  detailData: any;
  @ViewChild('ic', { static: false }) ic: any;
  godowns: any = [];
  serialnumbers: any = [];
  itemData: any = {
    serialstocks: {
      godowncodes: [],
      godownnames: [],
      serialnumbers: [],
      reffield2: [],
      reffield3: [],
      reffield4: [],
      reffield5: [],
      reffield6: [],
      reffield7: [],
      reffield8: [],
      reffield9: [],
      reffield10: [],
    },
  }
  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  processentry: any;
  processid: any
  processdetail: any;
  operatorcodes: any = [];
  machinecodes: any = [];
  AccgodownCode: any = '';
  RejgodownCode: any = '';
  RewgodownCode: any = '';
  ScrgodownCode: any = '';
  processCode: any = '';
  processName: any = '';
  inspectionData: any;
  reasonsList: any = [];
  processList: any = [];
  reworkprocesscode: any = '';
  showCon = false;
  insSerialNumbers: any = [];
  acceptedSerials: string[] = [];
  rejectedSerials: string[] = [];
  reworkSerials: string[] = [];
  scrapSerials: string[] = [];
  reftype: any = '';
  qc_profilecodes: any = [];
  spec_profilecodes: any = [];
  accepted_qcinfo: any = [];
  rejected_qcinfo: any = [];
  rework_qcinfo: any = [];
  scrap_qcinfo: any = [];
  shapeItem = false;
  serialnumbersForMore: any = [];

  constructor(
    public location: Location,
    private router: Router,
    public route: ActivatedRoute,
    public data: DataService,
    public urlService: UrlService,
    public apiService: ApiService,

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
    let id1 = await this.urlService.decode(id);
    this.id = id1;
    console.log(this.id)
    this.getDataopertors()

    this.selectedItem = {}
    this.from = this.id.from;
    this.mode = this.id.mode ? this.id.mode : ' ';
    this.detailData = this.id.detailData ? this.id.detailData : {}
    this.dirConvertion = this.id.dirConvertion ? this.id.dirConvertion : false

    this.processentry = this.id.processentry;
    this.processdetail = this.id.processdetail;
    this.processid = this.id.processid;
    console.log(this.processentry);
    console.log(this.processdetail);
    console.log(this.processid);

    if (this.from === 'processcompleted') {
      this.processList = this.id.processList ? this.id.processList : []
    }

    if (this.processentry && Array.isArray(this.processentry.machineinfo)) {
      this.machinecodes = this.processentry.machineinfo
        .map((m: any) => m.machinecode)
        .filter((code: any) => code != null); // optional, filter out null/undefined
    }

    if (this.processentry && Array.isArray(this.processentry.operatorinfo)) {
      this.operatorcodes = this.processentry.operatorinfo
        .map((m: any) => m.operatorcode)
        .filter((code: any) => code != null); // optional, filter out null/undefined
    }

    this.totalQty = this.id?.qty ? JSON.parse(JSON.stringify(this.id?.qty)) : '0';


  }

  goBack() {
    this.location.back()
  }


  goToJobOrdercompleted() {
    this.router.navigate(['/home/job-order-status-completed'])
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  getDataopertors() {
    this.apiService.getEmployeeList(this.getEmployee).subscribe((success) => {
      if (success.Status === true) {
        this.empolyes = success.data;
      } else {
        this.empolyes = [];
      }
    })
    this.getDatamachines()
  }

  getDatamachines() {
    this.apiService.getItems(this.getMachine).subscribe((success) => {
      if (success.Status === true) {
        this.machinedata = success.data;
      } else {
        this.machinedata = [];
      }

      if (this.from === 'processcompleted') {
        this.getProcessPlans()
      }
      else {

        this.getJobOrders()
      }

    },);
  }

  getEmployeeName(code: string): string {
    return this.empolyes.find((e: any) => e.employeecode === code)?.employeename || code;
  }
  getMachineName(code: string): string {
    return this.machinedata.find((e: any) => e.ic === code)?.ina || code;
  }



  getJobOrders(): Promise<any> {
    return new Promise((resolve, reject) => {
      let jobData: any[] = [];
      let insData: any[] = [];
      let rewData: any[] = [];
      let waitData: any[] = [];
      this.searchData.joentryid = this.processid?.joeid;
      this.searchData.itemcodes[0] = this.processid?.ic;
      if (this.dirConvertion) {
        this.searchData.nextprocesscodes[0] = this.processentry?.pco
      }
      this.apiService.jobPendingsForNextInhouseProcess(this.searchData).subscribe({
        next: (jobRes: any) => {
          if (jobRes && jobRes.Status && jobRes.data.length > 0) {
            jobData = jobRes.data.map((item: any) => ({
              refno: item.entryno,
              refentryid: item.entryid,
              reffinyearcode: item.orderfinyearcode,
              refdatetime: item.entryfinyearcode,
              // reftype: 'orderbased',
              ...item,
            }));
            this.filteredJobOrders = JSON.parse(JSON.stringify(jobData));
          } else {
            // No data from first API, but do NOT reject or return here.
            jobData = [];
            // Optional: maybe notify no job data, but continue
          }

          if (this.filteredJobOrders.length === 1) {
            if (this.filteredJobOrders[0].items.length === 1) {
              this.selectedJobOrder = this.filteredJobOrders[0];
            }
            if (this.filteredJobOrders[0].items.length > 1) {
              this.getPendingListForSelect(this.filteredJobOrders)
            }
          }
          if (this.filteredJobOrders.length > 1) {
            this.getPendingListForSelect(this.filteredJobOrders)
          }

          this.selectedJobOrder?.items?.forEach((item: any) => {
            item.serialnumbers = item.serialnumbers ? item.serialnumbers.map((item: any) => { return { code: item, description: item } }) : []
            item.serials = JSON.parse(JSON.stringify(item.serialnumbers))
            item.entqty = JSON.parse(JSON.stringify(item.balanceqty));
            item.entaltqty = JSON.parse(JSON.stringify(item.ospplan_altqty));
            item.checkbox = true;
            if (item.serialnumbers.length > 0) {
              this.serialnumbers = JSON.parse(JSON.stringify(item.serialnumbers.map((el: any) => el.code)));
            }

          })
          resolve(jobData);



          // Call second API regardless of first's data
          // if (this.dirConvertion) {
          //   this.searchData.processcodes = []
          //   this.searchData.nextprocesscodes[0] = this.processentry?.pco
          // }
          // this.apiService.ipInsPendingForNext(this.searchData).subscribe({
          //   next: (insRes: any) => {
          //     if (insRes && insRes.Status && insRes.data.length > 0) {
          //       insData = insRes.data.map((item: any) => ({
          //         refno: item.ipinsno,
          //         refentryid: item.ipinsentryid,
          //         reffinyearcode: item.ipinsfinyearcode,
          //         refdatetime: item.ipinsdatetime,
          //         reftype: 'inspectionbased',
          //         ...item,
          //       }));
          //     } else {
          //       insData = [];
          //       // Optional alert or log for no inspection data
          //     }

          //     // Call third API regardless of previous data
          //     if (this.dirConvertion) {
          //       this.searchData.processcodes = []
          //       this.searchData.nextprocesscodes[0] = this.processentry?.pco
          //     }
          //     this.apiService.ipInsReworkPendingForNext(this.searchData).subscribe({
          //       next: (rewRes: any) => {
          //         if (rewRes && rewRes.Status && rewRes.data.length > 0) {
          //           rewData = rewRes.data.map((item: any) => ({
          //             refno: item.ipinsno,
          //             refentryid: item.ipinsentryid,
          //             reffinyearcode: item.ipinsfinyearcode,
          //             refdatetime: item.ipinsdatetime,
          //             reftype: 'reworkbased',
          //             ...item,
          //           }));
          //         } else {
          //           rewData = [];
          //         }

          //         if (this.dirConvertion) {
          //           this.searchData.processcodes = []
          //           this.searchData.nextprocesscodes[0] = this.processentry?.pco
          //         }
          //         this.apiService.processCompWaitingForNext(this.searchData).subscribe({
          //           next: (waiRes: any) => {
          //             if (waiRes && waiRes.Status && waiRes.data.length > 0) {
          //               waitData = waiRes.data.map((item: any) => ({
          //                 refno: item.pceno,
          //                 refentryid: item.pcentryid,
          //                 reffinyearcode: item.pcefinyearcode,
          //                 refdatetime: item.pcedatetime,
          //                 reftype: 'waitbased',
          //                 ...item,
          //               }));
          //             } else {
          //               waitData = [];
          //             }

          //             // Merge all data arrays (some may be empty)
          //             const merged = [...jobData, ...insData, ...rewData, ...waitData];

          //             // Update local properties
          //             this.jobOrders = merged;
          //             this.filteredJobOrders = JSON.parse(JSON.stringify(merged));
          //             if (this.filteredJobOrders.length === 1) {
          //               this.selectedJobOrder = this.filteredJobOrders[0];
          //             }
          //             if (this.filteredJobOrders.length > 1) {
          //               this.getPendingListForSelect(this.filteredJobOrders)
          //             }

          //             this.selectedJobOrder?.items?.forEach((item: any) => {
          //               item.serialnumbers = item.serialnumbers ? item.serialnumbers.map((item: any) => { return { code: item, description: item } }) : []
          //               item.serials = JSON.parse(JSON.stringify(item.serialnumbers))
          //               item.entqty = JSON.parse(JSON.stringify(item.balanceqty));
          //               item.entaltqty = JSON.parse(JSON.stringify(item.ospplan_altqty));
          //               item.checkbox = true;

          //             })

          //             resolve(merged);
          //           },

          //           error: (err: any) => {
          //             this.data.openAlertFalse(err);
          //             reject(err);
          //           },
          //         });
          //       },
          //       error: (err: any) => {
          //         this.data.openAlertFalse(err);
          //         reject(err);
          //       },
          //     });
          //   },
          //   error: (err: any) => {
          //     this.data.openAlertFalse(err);
          //     reject(err);
          //   },
          // });
        },
        error: (err: any) => {
          this.data.openAlertFalse(err);
          reject(err);
        },
      });
    });
  }



  getProcessPlans(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.searchData.joentryid = this.processid?.joeid;
      this.searchData.itemcodes[0] = this.processid?.ic;
      if (this.dirConvertion) {
        this.searchData.nextprocesscodes = []
        this.searchData.processcodes = []
        this.searchData.processcodes[0] = this.processdetail?.pco
      }
      this.apiService.processPlanPendingList(this.searchData).subscribe(
        {
          next: (success: any) => {
            if (success.Status) {
              this.filteredJobOrders = JSON.parse(JSON.stringify(success.data));
              // this.selectedJobOrder = this.filteredJobOrders[0];
              this.filteredJobOrders = this.filteredJobOrders.map((item: any) => ({
                refno: item.processentryno,
                refentryid: item.processentryid,
                reffinyearcode: item.processfinyearcode,
                refdatetime: item.processentrydate,
                // reftype: 'orderbased',
                ...item,
              }));
              if (this.filteredJobOrders.length === 1) {
                if (this.filteredJobOrders[0].items.length === 1) {
                  this.selectedJobOrder = this.filteredJobOrders[0];
                }
                if (this.filteredJobOrders[0].items.length > 1) {
                  this.getPendingListForSelect(this.filteredJobOrders)
                }
              }
              if (this.filteredJobOrders.length > 1) {
                this.getPendingListForSelect(this.filteredJobOrders)
              }
              this.selectedJobOrder?.items?.forEach((item: any) => {
                if (item.reftype === 'SERIAL') {
                  if (item.serialnumbers.length === 0) {
                    for (let i = 0; i < +item.balanceqty; i++) {
                      this.serialnumbers.push(this.selectedJobOrder?.processentryno + this.processdetail?.refn + i + 1)
                    }
                  }
                }
                item.serialnumbers = item.serialnumbers ? item.serialnumbers.map((item: any) => { return { code: item, description: item } }) : []
                item.serials = JSON.parse(JSON.stringify(item.serialnumbers))
                item.entqty = JSON.parse(JSON.stringify(item.balanceqty));
                item.entaltqty = JSON.parse(JSON.stringify(item.processplanaltqty));
                item.checkbox = true;
                if (item.serialnumbers.length > 0) {
                  this.serialnumbers = JSON.parse(JSON.stringify(item.serialnumbers.map((el: any) => el.code)));
                }
              })
              resolve(success);
            } else {
              this.filteredJobOrders = [];
              this.data.errorMessage(success);
              reject(success);
            }
          },
          error: (error: any) => {
            this.data.openAlertFalse(error);
            reject(error);
          }
        })

    })
  }

  getPendingListForSelect(val: any) {
    if (!this.dirConvertion) {
      return
    }
    let openPopup = false
    const data = val;
    const hasSomeButNotAllSix =
      val.some((el: any) => el.entryflagcode === '6') &&
      !val.every((el: any) => el.entryflagcode === '6');

    // Flatten all nested items into one array
    const allItems = val.flatMap((el: any) => el.items || []);

    const hasMixedSerials =
      allItems.some((item: any) => item.reftype === 'SERIAL' && item.serialnumbers.length === 0) &&
      allItems.some((item: any) => item.reftype === 'SERIAL' && item.serialnumbers.length > 0);

    if (
      (this.from === 'processplan' && hasSomeButNotAllSix) ||
      (this.from === 'processcompleted' && hasMixedSerials)
    ) {
      openPopup = true;
    }




    else {
      openPopup = false
    }

    console.log(openPopup)
    // return

    if (!openPopup) {
      this.getMoreData(data)
    }

    else {

      //   const dialogRef = this.dialog.open(PendingListForSelectionComponent, {
      //     width: '750px',
      //     disableClose: true,
      //     height: '550px',
      //     data: {
      //       pendings: val,
      //       from: this.from
      //     }
      //   });
      //   dialogRef.afterClosed().subscribe(result => {

      //     if (result) {
      //       console.log(result)
      //       this.getMoreData(result)
      //     }
      //   })
    }
  }


  getMoreData(data: any) {
    this.totalQty = parseFloat('0')
    this.serialnumbers = [];
    this.serialnumbersForMore = [];
    const orgData: any = [];
    data.forEach((element: any) => {
      if (element.items.length === 1) {
        element.items?.forEach((item: any) => {
          if (item.reftype === 'SERIAL' && this.from === 'processcompleted' && !item.serialnumbers || item.serialnumbers.length === 0) {
            for (let i = 0; i < +item.balanceqty; i++) {
              this.serialnumbers.push(element.processentryno + this.processdetail?.refn + i + 1);
            }

          }

          else if (item.reftype === 'SERIAL' && item.serialnumbers.length > 0) {
            item.serialnumbers.forEach((s: any) => {
              let obj = {
                code: s,
                description: s,
                entryid: element.entryid
              }
              this.serialnumbersForMore.push(obj);
            }
            );
          }



          item.serials = [...item.serialnumbers]; // shallow clone is enough here
          item.entqty = item.balanceqty;
          item.entaltqty = item.processplanaltqty && this.from === 'processcompleted' ? item.processplan_altqty : item.ospplan_altqty;
          item.checkbox = true;

          this.totalQty += +item.balanceqty;

        });
        orgData.push(element);
      }
      else if (element.items.length > 1) {
        element.items?.forEach((item: any) => {
          if (item.reftype === 'SERIAL' && this.from === 'processcompleted' && !item.serialnumbers || item.serialnumbers.length === 0) {

            for (let i = 0; i < +item.balanceqty; i++) {
              this.serialnumbers.push(element.processentryno + this.processdetail?.joentryid + this.processdetail?.refn + i + 1);
            }

          }

          else if (item.reftype === 'SERIAL' && item.serialnumbers.length > 0) {
            item.serialnumbers.forEach((s: any) => {
              let obj = {
                code: s,
                description: s,
                entryid: element.entryid
              }
              this.serialnumbersForMore.push(obj);
            }
            );
          }



          item.serials = [...item.serialnumbers]; // shallow clone is enough here
          item.entqty = item.balanceqty;
          item.entaltqty = item.processplanaltqty && this.from === 'processcompleted' ? item.processplan_altqty : item.ospplan_altqty;
          item.checkbox = true;

          this.totalQty += +item.balanceqty;
          orgData.push({
            ...element,
            items: [item]
          }
          );
        });

      }
    });
    this.totalQty = this.totalQty.toString()
    console.log(orgData, this.serialnumbersForMore)
    this.moreData = orgData
    if (this.serialnumbersForMore.length > 0) {
      this.serialnumbers = JSON.parse(JSON.stringify(this.serialnumbersForMore.map((el: any) => el.code)));
    }
  }

  submitfinal() {

    if (this.from === 'processplan') {
      if (this.selectedJobOrder?.items[0]?.reftype === 'SERIAL') {
        this.selectedJobOrder.items[0].serialnumbers = this.serialnumbers.length > 0 ? JSON.parse(JSON.stringify(this.serialnumbers)) : []
      }
      // this.goToJobOrdercompleted()
      this.submitorder()
    }

    else if (this.from === 'processcompleted') {

      this.convertProcessPendingToComplete()
    }

  }

  submitorder() {
    console.log(this.selectedJobOrder)
    const items = JSON.parse(JSON.stringify(this.selectedJobOrder.items))
    this.selectedItems = items
      .filter((item: any) => item.checkbox)
      .map((el: any) => ({
        ...el,
        serialnumbers: this.serialnumbers.length > 0 && el.reftype === 'SERIAL' ? JSON.parse(JSON.stringify(this.serialnumbers)) : [],
        qty: this.totalQty ? this.totalQty : el.balanceqty,
        altqty: el.entaltqty ? el.entaltqty : el.ospplan_altqty
      }));

    if (this.selectedItems.some((item: any) => item.reftype === 'SERIAL' && (item.serialnumbers.length > 0 && parseFloat(item.qty) !== item.serialnumbers.length))) {
      this.data.openAlertFalse('Kindly check the serial numbers with the qty');
      return;
    }
    this.btnClicked = true;

    const obj: any = {
      processcode: this.moreData.length === 0 ? this.selectedJobOrder.nextprocesscode : this.moreData[0].nextprocesscode,
      data: [],
    }




    if (this.moreData.length === 0) {



      obj.data[0] = {
        items: this.selectedItems,
        basedonno: this.selectedJobOrder.entryno,
        basedonentryid: this.selectedJobOrder.entryid,
        basedonfinyearcode: this.selectedJobOrder.entryfinyearcode,
        flagcode: this.selectedJobOrder.entryflagcode
      };
    }
    else {
      let remainingQty = +this.totalQty; // total to adjust

      const adjustedItems: any[] = [];

      for (const element of this.moreData) {
        let groupedEntry = adjustedItems.find(e => e.entryid === element.entryid);

        if (!groupedEntry) {
          groupedEntry = {
            entryno: element.entryno,
            entryid: element.entryid,
            entryfinyearcode: element.entryfinyearcode,
            entryflagcode: element.entryflagcode,
            items: []   // collect items here
          };
          adjustedItems.push(groupedEntry);
        }

        for (const item of element.items) {
          if (remainingQty <= 0) break;

          if (item.reftype === 'SERIAL' && item.serialnumbers.length > 0) {
            if (this.serialnumbers.length === 0 || parseFloat(this.totalQty) !== this.serialnumbers.length) {
              this.data.openAlertFalse('Kindly check the serial numbers with the qty');
              this.btnClicked = false;
              return;
            }

            let selectedSerials: any[] = [];

            item.serialnumbers.forEach((s: any) => {
              this.serialnumbers.forEach((sel: any) => {
                if (s === sel) {
                  selectedSerials.push(s);
                }
              });
            });

            if (selectedSerials.length > 0) {
              groupedEntry.items.push({
                ...item,
                qty: selectedSerials.length,
                serialnumbers: selectedSerials
              });
              remainingQty -= selectedSerials.length;
            }
          } else {
            // normal qty based item
            const takeQty = Math.min(+item.balanceqty, remainingQty);
            if (takeQty > 0) {
              groupedEntry.items.push({
                ...item,
                qty: takeQty
              });
              remainingQty -= takeQty;
            }
          }
        }

        if (remainingQty <= 0) break;
      }

      adjustedItems.forEach((item: any) => {
        // item.qty = item.qty.toString()
        let object = {
          items: item?.items[0].ic ? item.items : [item],
          basedonno: item.entryno,
          basedonentryid: item.entryid,
          basedonfinyearcode: item.entryfinyearcode,
          flagcode: item.entryflagcode
        };
        obj.data.push(object)
      })
      console.log("Final Obj:", obj);
    }
    // return
    this.apiService.jobProcessItemsConvertToDraftInhouse(obj).subscribe((success: any) => {
      if (success.Status) {
        // this.data.openAlert(success);
        this.confirmProcessPlan(success.data.tempprocessentryno, success.data.processentryid, success.data.processentrydate, success.data.processentrynotes, success.data.processcode);
      } else {
        this.data.errorMessage(success);
        this.btnClicked = false;
      }

    })
  }

  confirmProcessPlan(tempprocessentryno: any, processentryid: any, processentrydate: any, processentrynotes: any, processcode: any) {

    this.btnClicked = true;
    const obj: any = {
      "tempprocessentryno": tempprocessentryno,
      "processentryid": processentryid,
      "processentrydate": processentrydate,
      "processentrynotes": processentrynotes,
      "processcode": processcode,
    }

    console.log(this.machinecodes)
    if (this.machinecodes.length > 0) {
      obj.usedmachinesinfo = this.machinecodes.map((machine: any) => ({
        machineitemcode: machine
      }));
    }
    if (this.operatorcodes.length > 0) {
      obj.workedoperatorinfo = this.operatorcodes.map((employee: any) => ({
        operatorcode: employee
      }));
    }

    this.apiService.confirmProcessPlan(obj).subscribe(async (success: any) => {

      if (success.Status) {
        this.data.successMessage(success)
        if (this.salesData && this.salesData.salesentryid) {
          this.salesData.salesentrytypename = 'SPARE_CONSUMPTION';
          this.salesData.basedoncode = '14';
          this.salesData.consumeforprocessstartentryinfo = {
            processentryid: processentryid,
            processentryno: success.processentryno,
            processentryfycode: success.finyearcode
          }
          this.apiService.confirmSales(this.salesData).subscribe((result: any) => {
            if (result.Status) {
              this.router.navigate(['/home/inprogress-job-orders'])
              this.btnClicked = false;
            }
            else {
              this.data.errorMessage(result)
              this.btnClicked = false;
            }
          })
        }
        else {
          const url1 = 'draftprocessplanentryitems/clear'
          this.apiService.deleteInfo(url1).subscribe(async (success) => {
          })
          this.router.navigate(['/home/inprogress-job-orders'])
          this.btnClicked = false;
        }

      }
      else {
        this.data.errorMessage(success)
      }
    })
  }




  async convertProcessPendingToComplete() {
    const items = JSON.parse(JSON.stringify(this.selectedJobOrder.items))
    this.selectedItems = items
      .filter((item: any) => item.checkbox)
      .map((el: any) => ({
        ...el,
        serialnumbers: this.serialnumbers.length > 0 && el.reftype === 'SERIAL' ? JSON.parse(JSON.stringify(this.serialnumbers)) : [],
        // serialnumbers: el.serialnumbers ? JSON.parse(JSON.stringify(el.serialnumbers.map((item: any) => item))) : [],
        qty: this.totalQty ? this.totalQty : el.balanceqty,
        altqty: el.entaltqty ? el.entaltqty : el.ospplan_altqty
      }));
    this.btnClicked = true;


    const obj: any = {
      processcode: this.moreData.length === 0 ? this.selectedJobOrder.processcode : this.moreData[0].processcode,
      data: [],
    }




    if (this.moreData.length === 0) {



      obj.data[0] = {
        items: this.selectedItems,
        basedonno: this.selectedJobOrder.processentryno,
        basedonentryid: this.selectedJobOrder.processentryid,
        basedonfinyearcode: this.selectedJobOrder.processfinyearcode
      };
    }
    else {
      let remainingQty = +this.totalQty; // total to adjust

      const adjustedItems: any[] = [];

      for (const element of this.moreData) {
        let groupedEntry = adjustedItems.find(e => e.processentryid === element.processentryid);

        if (!groupedEntry) {
          groupedEntry = {
            entryno: element.processentryno,
            entryid: element.processentryid,
            entryfinyearcode: element.processfinyearcode,
            items: []   // collect items here
          };
          adjustedItems.push(groupedEntry);
        }

        for (const item of element.items) {
          if (remainingQty <= 0) break;



          if (item.reftype === 'SERIAL') {
            if (item.serialnumbers.length > 0) {
              // Case 1: Serial numbers already exist on the item
              if (this.serialnumbers.length === 0 || parseFloat(this.totalQty) !== this.serialnumbers.length) {
                this.data.openAlertFalse('Kindly check the serial numbers with the qty');
                this.btnClicked = false;
                return;
              }

              let selectedSerials: any[] = [];

              item.serialnumbers.forEach((s: any) => {
                this.serialnumbers.forEach((sel: any) => {
                  if (s === sel) {
                    selectedSerials.push(s);
                  }
                });
              });

              if (selectedSerials.length > 0) {
                groupedEntry.items.push({
                  ...item,
                  qty: selectedSerials.length,
                  serialnumbers: selectedSerials
                });
                remainingQty -= selectedSerials.length;
              }
            } else {
              // if (this.serialnumbers.length === 0 || parseFloat(this.totalQty) !== this.serialnumbers.length) {
              //   this.data.openAlertFalse('Kindly check the serial numbers with the qty');
              //   this.btnClicked = false;
              //   return;
              // }
              const takeQty = Math.min(+item.balanceqty, remainingQty);

              if (takeQty > 0) {
                const takenSerials = this.serialnumbers.splice(0, takeQty); // pick from global serial list

                groupedEntry.items.push({
                  ...item,
                  qty: takenSerials.length,
                  serialnumbers: takenSerials
                });

                remainingQty -= takenSerials.length;
              }
            }
          } else {
            // Case 3: Normal qty based item
            const takeQty = Math.min(+item.balanceqty, remainingQty);
            if (takeQty > 0) {
              groupedEntry.items.push({
                ...item,
                qty: takeQty
              });
              remainingQty -= takeQty;
            }
          }

        }

        if (remainingQty <= 0) break;
      }





      adjustedItems.forEach((entry: any) => {
        if (!entry.items || entry.items.length === 0) {
          return; // skip empty entries
        }

        // stringify qty for all items in this entry
        entry.items.forEach((it: any) => {
          it.qty = it.qty.toString();
        });

        let object = {
          items: entry.items,
          basedonno: entry.entryno,
          basedonentryid: entry.entryid,
          basedonfinyearcode: entry.entryfinyearcode,
        };

        obj.data.push(object);
      });



    }



    const found = this.processList?.find(
      (element: any) => element.ic === this.selectedJobOrder.processcode
    );


    if ((found?.gdcode ?? 0) > 0) {
      obj.togodowncode = found.gdcode
    }
    else {
      await this.data.getWarehouseSetup('42');
      obj.togodowncode = this.data.warehouseDet.godowncode
    }
    console.log("Final Obj:", obj);

    this.apiService.processPlanPendingItemsconvertToComplete(obj).subscribe((success: any) => {
      if (success.Status) {

        this.confirmProcessComp(success.data);
      } else {
        this.btnClicked = false;
        this.data.errorMessage(success);
      }

    })
  }

  confirmProcessComp(val: any) {

    this.btnClicked = true;
    val.purchaseentrytypename = "PROCESSCOMPLETEDENTRY";
    val.processcode = this.processentry?.pco
    if (this.machinecodes.length > 0) {
      val.usedmachinesinfo = this.machinecodes.map((machine: any) => ({
        machineitemcode: machine
      }));
    }
    if (this.operatorcodes.length > 0) {
      val.workedoperatorinfo = this.operatorcodes.map((employee: any) => ({
        operatorcode: employee
      }));
    }

    this.apiService.confirmPurchase(val).subscribe(async (success: any) => {

      if (success.Status) {
        this.data.successMessage(success)
        if (this.salesData && this.salesData.salesentryid) {
          this.salesData.salesentrytypename = 'SPARE_CONSUMPTION';
          this.salesData.basedoncode = '16';
          this.salesData.consumeforpurchaseprocessentryinfo = {
            purchaseentryid: val.purchaseentryid,
            purchaseentryno: success.purchaseno,
            purchaseentryfycode: val.finyearcode
          }
          this.apiService.confirmSales(this.salesData).subscribe((result: any) => {
            if (result.Status) {
              this.btnClicked = false;
              this.router.navigate(['/home/inprogress-job-orders'])
            }
            else {
              this.btnClicked = false;
              this.data.errorMessage(result)
            }
          })
        }
        else {
          this.btnClicked = false;
          this.router.navigate(['/home/inprogress-job-orders'])
        }
      }
      else {
        const url = 'draftpurchaseitems/clear'
        this.apiService.deleteInfo(url).subscribe((success) => {
        })
        this.data.errorMessage(success)
        this.btnClicked = false;
      }
    })
  }

}
