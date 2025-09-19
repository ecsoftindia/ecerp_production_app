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
  standalone:false
})
export class JobOrderStatusDetailPage  {
  isEditing = false;

  machines = ["Lathe Machine", "Milling Machine"];
  operators = ["John Doe", "Mary Smith"];
  qty = 150;
  
  allMachines = ["Lathe Machine", "Milling Machine", "Drill Press", "CNC Machine"];
  allOperators = ["John Doe", "Mary Smith", "Alex Lee", "Sophia Ray"];

  id:any;
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
  processentry: any ;
  processid:any
  processdetail: any ;
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
    public location:Location,
    private router:Router,
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

 async init(){
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

  goBack(){
    this.location.back()
  }


//   goToJobOrdercompleted(){
//     this.router.navigate(['/home/job-order-status-completed'])
//  }
 
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
    },);
  }

  getEmployeeName(code: string): string {
    return this.empolyes.find((e:any) => e.employeecode === code)?.employeename || code;
  }
  getMachineName(code:string): string{
    return this.machinedata.find((e:any) => e.ic === code)?.ina || code;
  }

  submitfinal(){

    if (this.from === 'processplan') {
      if (this.selectedJobOrder?.items[0]?.reftype === 'SERIAL') {
        this.selectedJobOrder.items[0].serialnumbers = this.serialnumbers.length > 0 ? JSON.parse(JSON.stringify(this.serialnumbers)) : []
      }
      // this.submitorder()
      return;
     
    }

  }

  
}
