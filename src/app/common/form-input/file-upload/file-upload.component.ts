import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Subject } from "rxjs";
// import { AppSettingsService } from "../../services/app-settings/app-settings.service";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
  standalone:false
})
export class FileUploadComponent implements OnInit {
  @Input() public label: any = "";
  @Input() public mandatory: any = false;
  @Input() public dname: any = "";
  @Input() public filePath: any = "";
  @Input() public data: any;
  @Input() public uploaded = false;
  @Input() public expanded = false;
  @Input() public accept = "";
  @Input() public sublabel = "";
  @ViewChild("nativeFileUpload", { static: false })
  navtiveFileUpload!: ElementRef;
  @ViewChild("fileInput", { static: false })
  fileInput!: ElementRef;
  @Output("onload") onload: EventEmitter<any> = new EventEmitter();
  @Output("onclear") onclear: EventEmitter<any> = new EventEmitter();
  @Output("onUpload") onUpload: EventEmitter<any> = new EventEmitter();

  loadingNow = false;

  @Input() public xFile: any = {
    fileName: "",
    fileType: "",
    fileSize: 0,
    relativePath: "",
    istrFileContent: "",
  };
  @Input() public file: any = {
    fileName: "",
    fileType: "",
    fileSize: 0,
    relativePath: "",
    istrFileContent: "",
  };

  errorTrueNow = false;
  @Input()
  set errorTrue(errorTrue: boolean) {
    this.errorTrueNow = errorTrue || false;
  }
  get errorTrue() {
    return this.errorTrueNow;
  }
  @Input()
  set loading(loading: boolean) {
    this.loadingNow = loading || false;
  }
  get loading() {
    return this.loadingNow;
  }
  disabledNow = false;
  @Input()
  set disabled(disabled: boolean) {
    this.disabledNow = disabled || false;
  }
  get disabled() {
    return this.disabledNow;
  }

  errorText = "";

  constructor() {
    // super();
  }

  ngOnInit(): void { }

  // ngOnChanges(changes: SimpleChanges) {
  //   for (let propName in changes) {
  //     if (propName === 'uploaded') {
  //       if(this.uploaded){
  //         this.xFile = this.file;
  //       }
  //       // console.log(this.uploaded);
  //     }
  //   }
  //   // // console.log(changes);
  // }

  loadImageFromDevice(event:any) {
    // console.log(event);
    this.errorText = "";
    const file = event.target.files[0];
    // // console.log(file.size, this.appSettingService.environment.maxFileSize);
    // if (file.size > this.appSettingService.environment.maxFileSize) {
    //   this.errorText = this.appSettingService.environment.fileSizeErrorMsg;
    //   this.removeFileUpload();
    //   return;
    // }
    this.xFile = {
      fileName: file.name,
      fileType: file.name.substring(file.name.lastIndexOf(".") + 1),
      fileSize: file.size,
      relativePath: "",
      istrFileContent: "",
    };

    // // console.log(event);
    // const file = event.target.files[0];
    const reader = new FileReader();
    // let FileName = event.target.files[0].name;
    // let FileType = FileName.substring(FileName.lastIndexOf('.') + 1);
    // let FileSizeinBytes = event.target.files[0].size;
    // let sizeInKb = FileSizeinBytes / 1000;
    // let sizeInMb = sizeInKb / 1024;
    // let ImageSize = sizeInMb;

    reader.readAsDataURL(file);
    reader.onload = () => {
      const img: any = reader.result;
      this.xFile.istrFileContent = img;
      // this.data[this.dname] = file.name;
      // this.data[this.filePath] = img;
      this.onFileLoad(this.xFile);
    };
    reader.onerror = (error) => {
      // console.log(error);
      //  this.general.openMsg('Error has been occured,while selecting the file.', 'danger');
    };
  }

  removeFileUpload() {
    // // console.log(this.navtiveFileUpload);
    this.xFile = {
      fileName: "",
      fileType: "",
      fileSize: 0,
      relativePath: "",
      istrFileContent: "",
    };
    this.fileInput.nativeElement.value = "";
  }

  onFileLoad(val:any) {
    this.onload.next(val);
  }

  triggerClick() {
    if (!this.disabledNow) {
      this.fileInput.nativeElement.click();
    }
  }

  clear() {
    this.removeFileUpload();
    // this.onclear.next();
    this.onclear.next(this.data);
  }
  doUpload() {
    this.onUpload.next(true);
  }
}
