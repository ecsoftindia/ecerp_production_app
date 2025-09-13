import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild,
  input,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { IonInput, IonModal, IonSearchbar } from '@ionic/angular';
import { FromInputControl } from '../form-input-control';
import { AppStorageService } from '../../services/app-storage/app-storage.service';

@Component({
  selector: 'app-select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss'],
  standalone:false
})
export class SelectControlComponent extends FromInputControl implements OnInit {
  isModalOpenforPattern = false;
  // // @Input() public items = [];
  // @ViewChild(IonModal) modal!: IonModal;
  // @ViewChild('searchBar') searchBar!: IonSearchbar;
  // xName = '';
  // @Input() public key: string = '';
  // @Input() public keyname: string = '';
  // @Input() public placeholderLabel: string = '';
  // @Input() public sort: boolean = true;
  // @Input() public clearIcon: boolean = true;
  // itemsNow = [];
  // @Input()
  // set items(items: any) {
  //   console.log(items)
  //   this.itemsNow = items || [];
  //   //// console.log(items);
  //   if (items) {
  //     if (items.length > 3) {
  //       this.search = true;
  //       // this.getSelected();
  //       // this.clearIcon = true;
  //     }
  //   }
  // }
  // get items() {
  //   return this.itemsNow;
  // }

  // searchItem = '';
  // tempSelected: any = "";
  // selectedItem: any;
  // modalOpen = false;
  // constructor(
  //   @Self() @Optional() public control: NgControl,
  //   private cdf: ChangeDetectorRef
  // ) {
  //   super();
  //   this.control && (this.control.valueAccessor = this);

  //   // this.control && (this.control.valueAccessor = this);
  // }

  // ionViewDidEnter() {
  //   this.onSearchBarFocus();
  // }

  // ngOnInit(): void {
  //   this.onSearchBarFocus();

  //   this.setValidate(this.control);
  //   // // console.log(this.search);
  //   this.cdf.detectChanges();
  //   setTimeout(() => {
  //     this.viewValueChange().subscribe(async (xvalue) => {
  //       console.log(xvalue)
  //       if (xvalue) {
  //         if (this.value) {
  //           console.log('Value' ,this.value)
  //           this.getSelected();
  //         } else {
  //           this.selectedItem = undefined;
  //           this.tempSelected = "";
  //         }
  //       }
  //     });
  //   }, 2000);


  // }


  // onSearchBarFocus() {
  //   setTimeout(() => {
  //     if (this.searchBar) {
  //       this.searchBar.setFocus();
  //     }
  //   }, 500);
  // }

  // getSelected() {
  //   this.tempSelected = this.value.toString();
  //   // let value = this.value.toString();
  //   console.log(this.tempSelected);
  //   console.log(this.itemsNow)
  //   let index = this.itemsNow.map((e: any) => e[this.key]).indexOf(this.tempSelected);
  //   // let index = this.itemsNow.findIndex((item: any) => item[this.key] === this.tempSelected);
  //   console.log('index', index)

  //   if (index > -1) {
  //     // this.selectedItem = JSON.parse(JSON.stringify(this.itemsNow[index]));
  //     this.selectedItem = this.itemsNow[index];
  //     console.log(this.selectedItem);
  //     this.tempSelected = this.selectedItem[this.key]
  //     this.xName = this.selectedItem[this.keyname];
  //   }
  //   // console.log('Selected Item',this.selectedItem)
  // }



  // triggerModal() {
  // }

  // doConfirm() {
  //   this.xName = this.selectedItem[this.keyname];
  //   this.value = this.selectedItem[this.key];
  //   this.dismiss();
  //   // console.log(this.xName)
  // }
  // valueSelected(item: any) {
  //   this.selectedItem = item;
  //   this.tempSelected = item[this.key];
  //   this.doConfirm();
  // }
  // dismiss() {
  //   this.modal.dismiss();
  // }


  // setFocusOnSearchBar() {
  //   setTimeout(() => {
  //     if (this.searchBar) {
  //       this.searchBar.setFocus();
  //     }
  //   }, 500); // Adjust the delay if needed
  // }

  // @Input() public items = [];
  @ViewChild(IonModal) modal!: IonModal;
  xName = '';
  @Input() public key: string = '';
  @Input() public keyname: string = '';
  @Input() public placeholderLabel: string = '';
  @Input() public sort: boolean = true;
  @Input() public clearIcon: boolean = true;

  @Input() types = "";
  @Input() color = "";
  @Input() cust = "";
  itemsNow: any = [];
  @Input()
  set items(items: any) {
    this.itemsNow = items || [];
    const selectedCodes = new Set(this.selectedItems.map((el2: any) => el2[this.key]));

    this.itemsNow.forEach((element: any) => {
      if (selectedCodes.has(element[this.key])) {
        element.selected = true;
        // this.selectedItems.push(element)
      }
      else{
        delete element.selected
      }
    });
    if (items) {
      if (items.length > 0) {
        this.search = true;
        if (this.types === '') {
          this.getSelected();
        }
        else{
          // const selectedCodes = this.value;
          // let names:any = [];
          // this.itemsNow.forEach((element: any) => {
          //   if (selectedCodes.includes(element[this.key])) {
          //     console.log(element)
          //     element.selected = true;
          //     names.push(element[this.keyname]);
          //   }
          // });
          // this.xName = names.join(', ');
        }
     
        // this.clearIcon = true;
      }
    }
  }
  get items() {
    return this.itemsNow;
  }

  searchItem = '';
  tempSelected = "";
  selectedItem: any;
  selectedItems: any[] = [];
  @ViewChild('searchh', { static: false }) searchh: any;
  @Output('infinity') infinity: EventEmitter<any> = new EventEmitter();
  @Output('se') se: EventEmitter<any> = new EventEmitter();
  temp: any = [];
  constructor(
    @Self() @Optional() public control: NgControl,
    private cdf: ChangeDetectorRef,
    public storage: AppStorageService
  ) {
    super();
    this.control && (this.control.valueAccessor = this);

    // this.control && (this.control.valueAccessor = this);
  }


  ngOnInit(): void {
    console.log(this.types)
    console.log(this.color)
    this.setValidate(this.control);
    console.log(this.searchh);
    // console.log(this.search);
    this.cdf.detectChanges();
    this.viewValueChange().subscribe(async (xvalue) => {
      if (xvalue) {

        if (this.value) {
          console.log('Value', this.value , this.types)
          if (this.types === '') {
            this.getSelected();
          }
          else{
            // const selectedKeys = this.value;
            // this.selectedItems = this.itemsNow.filter((item: any) => selectedKeys.includes(item[this.key].toString()));
            // this.xName = this.selectedItems.map((item) => item[this.keyname]).join(', ');
            const selectedCodes = this.value;
            let names:any = [];
            this.itemsNow.forEach((element: any) => {
              if (selectedCodes.includes(element[this.key])) {
                element.selected = true;
                this.selectedItems.push(element)
                names.push(element[this.keyname]);
              }
            });
            this.xName = names.join(', ');
          }
        } else {
          this.selectedItem = undefined;
          this.tempSelected = "";
          this.xName = ''
        }
      }
    });
  }

  getSelected() {
    if (!this.multiple) {
      this.tempSelected = this.value;

      let index = this.itemsNow.findIndex((item: any) => item[this.key] === this.tempSelected);

      if (index > -1) {
        this.selectedItem = this.itemsNow[index];
        console.log(this.selectedItem , this.selectedItem[this.keyname])
        this.xName = this.selectedItem[this.keyname];
      }
    } else {
      const selectedKeys = this.value;
      this.selectedItems = this.itemsNow.filter((item: any) => selectedKeys.includes(item[this.key].toString()));

      this.xName = this.selectedItems.map((item) => item[this.keyname]).join(', ');
    }
    console.log('Selected Item', this.selectedItem)
  }

  // getSelected(){
  //   this.tempSelected = this.value.toString();
  //         // let value = this.value.toString();
  //           let index = this.itemsNow.map((e:any) => e[this.key]).indexOf(this.tempSelected);
  //           // let index = this.itemsNow.findIndex((item: any) => item[this.key] === this.tempSelected);
  //           console.log('index', index)
  //           if(index > -1){
  //             // this.selectedItem = JSON.parse(JSON.stringify(this.itemsNow[index]));
  //             this.selectedItem = this.itemsNow[index];
  //             this.xName = this.selectedItem[this.keyname];
  //           }
  //           console.log('Selected Item',this.selectedItem)
  // }



  // triggerModal() {
  //   this.cdf.detectChanges
  //   setTimeout(() => {
  //     if (this.searchh) {
  //       this.searchh.setFocus();
  //     } else {
  //       console.error('searchh is not defined');
  //     }
  //   }, 500);
  // }

  triggerModal() {
    this.isModalOpenforPattern = true;
    console.log(this.value)
    this.storage.set('setpreviosedata', this.value)
    // Remove focus from the search field
    if (this.searchh) {
      this.searchh.blur();  // Removes focus from the search field
    } else {
      console.log('searchh is undefined');
    }

    setTimeout(() => {
      if (this.searchh) {
        this.searchh.setFocus();  // Set focus back to the search field after modal opens
      } else {
        console.log('searchh is still undefined');
      }
    }, 300);
  }


  onWillPresent(val: any) {

  }

  // Called when the modal is fully presented
  onDidPresent(val: any) {
    setTimeout(() => {
      if (this.searchh) {
        this.searchh.setFocus();
      } else {
        console.log('search is still undefined');
      }
    }, 300); // Small delay to ensure rendering
  }

  doConfirm() {
    // if (this.multiple) {
    //   // For multiple selection, join the selected item names and values
    //   const selectedKeys = this.selectedItems.map((item) => item[this.key]);
    //   this.xName = this.selectedItems.map((item) => item[this.keyname]).join(', ');
    //   this.value = selectedKeys;
    //   console.log(this.value)
    // } else {
    // For single selection, use the first selected item's name and value
    this.xName = this.selectedItems[0][this.keyname];
    this.value = this.selectedItems[0][this.key];
    this.tempSelected = this.selectedItems[0][this.key]
    // }
    //this.dismiss();

  }

  valueSelected(item: any) {
    if (this.multiple) {
      const index = this.selectedItems.findIndex((i) => i.selected === item.selected && i[this.key] === item[this.key]);
      if (index !== -1) {
        delete item.selected
        this.selectedItems.splice(index, 1);
        this.temp.splice(index, 1)
      } else {
        item.selected = true
        this.selectedItems.push(item);
        this.temp.push(JSON.parse(JSON.stringify(item)))
      }

      const selectedKeys = this.selectedItems.map((item) => item[this.key]);
      this.xName = this.selectedItems.map((item) => item[this.keyname]).join(', ');
      this.value = selectedKeys;
      this.storage.set('selectedD', JSON.parse(JSON.stringify(this.selectedItems)))

    } else {

      this.selectedItems = [item];
      this.doConfirm();
    }
  }

  // doConfirm(){
  //   this.xName = this.selectedItem[this.keyname];
  //   this.value = this.selectedItem[this.key];
  //   this.dismiss();
  //   console.log(this.xName)
  // }


  // valueSelected(item: any){
  //   this.selectedItem = item;
  //   this.tempSelected = item[this.key];
  //   this.doConfirm();
  // }
  dismiss() {
    this.modal.dismiss();
    this.isModalOpenforPattern = false
  }

  // dismiss2(){
  //   this.storage.get('setpreviosedata').then((val: any) => {
  //     console.log(val)
  //     if(val){
  //       console.log(val)
  //       this.value = val;
  //       if(this.multiple) {
  //         this.itemsNow.forEach((element:any) => {
  //           this.value.forEach((element2:any) => {
  //             if(element[this.key] === element2[this.key]){
  //               this.selectedItems.push(element)
  //             }
  //           });
           
  //         });
  //         this.xName =   this.selectedItems.map((item) => item[this.keyname]).join(', ');
  //       }
  //       else{
  //         this.itemsNow.forEach((element:any) => {
  //           if(element[this.key] === this.value){
  //             this.selectedItem = [element]
  //           }
  //         })
  //         this.xName = this.selectedItem[0][this.keyname];
        
  //       }

  //     }
       
      
  //   })
      
    
   
  //   this.modal.dismiss();
  //   this.isModalOpenforPattern = false
  // }

  dismiss2() {
    this.storage.get('setpreviosedata').then((val: any) => {
      if (!val) return;
  
      this.value = val;
      if (this.multiple) {
        console.log(this.value,this.itemsNow)
        this.selectedItems = this.itemsNow.filter((item: any) =>
          this.value.some((valItem: any) => item[this.key] === valItem)
        );
        console.log(this.selectedItems )
        this.xName = this.selectedItems.map((item) => item[this.keyname]).join(', ');
      } else {
        this.selectedItem = this.itemsNow.find((item: any) => item[this.key] === this.value);
        this.xName = this.selectedItem ? this.selectedItem[this.keyname] : '';
      }
    }).finally(() => {
      this.modal.dismiss();
      this.isModalOpenforPattern = false;
    });
  }
  
  isSelected(item: any) {
    return this.selectedItems.includes(item);
  }



  loadMore(event: any) {
    this.infinity.emit(event)
  }
  searchlist(event: any) {
    if (event.detail.value) {
      this.se.emit(this.searchItem)
    }
    else {
      this.se.emit(this.searchItem)
      this.cdf.detectChanges();
      // setTimeout(() => {
      //   console.log(this.itemsNow)
      //   const selectedCodes = new Set(this.selectedItems.map((el2: any) => el2.customercode));

      //   this.itemsNow.forEach((element: any) => {
      //     if (selectedCodes.has(element.customercode)) {
      //       console.log(element)
      //       element.selected = true;
      //     }
      //   });
        
      // }, 200);


      // this.storage.get('selectedD').then((val: any) => {
      //   console.log(val)
      //   if (val) {
      //     this.selectedItems = []
      //     val.forEach((element: any) => {
      //       this.selectedItems.push(element);
      //     });
      //   }
      //   this.cdf.detectChanges();
      //   console.log(this.selectedItems)
      // })
    }
  }

  cleardata(){
    
    if(this.multiple){
      this.value= []

    }
    else{
      this.value=''

    }
    this.xName = ''
    this.selectedItems = []
    console.log('hit')
  }
}
