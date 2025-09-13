import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { AppStorageService } from '../../services/app-storage/app-storage.service';

@Directive({
  selector: '[appAccessIf]'
})
export class AccessIfDirective {
  access: any;
  headArray: any = [];

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>, 
    public storage: AppStorageService,
    public data: DataService,
    ) {
    this.viewContainer.clear();
  }


  @Input() set appAccessIf(id: string) {
    this.storage.get('authorizationResponse').then((val:any) => {
      if (val) {
        this.access = val;
        this.GetAll(id);
      }
    });
  }

  GetAll(id:any) {
    const idArray = id.split('-');
    // tslint:disable-next-line: max-line-length
    const type = this.setCatFn(idArray[1]);
    this.access.rights.forEach((element1:any) => {
      if (idArray[0] === element1.screengroup) {
        if (element1.moduleallowed === 'YES') {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      } else {
        // element1.screens.forEach((element2:any) => {
        //   if (element2.screenname.toLowerCase() === idArray[0].toLowerCase()) {
        //     if (type === 'access') {
        //       if (element2.access === 'YES') {
        //         this.viewContainer.createEmbeddedView(this.templateRef);
        //       }
        //     } else if (type === 'save') {
        //       if (element2.save === 'YES') {
        //         this.viewContainer.createEmbeddedView(this.templateRef);
        //       }
        //     } else if (type === 'update') {
        //       if (element2.update === 'YES') {
        //         this.viewContainer.createEmbeddedView(this.templateRef);
        //       }
        //     } else if (type === 'delete') {
        //       if (element2.delete === 'YES') {
        //         this.viewContainer.createEmbeddedView(this.templateRef);
        //       }
        //     } else if (type === 'print') {
        //       if (element2.print === 'YES') {
        //         this.viewContainer.createEmbeddedView(this.templateRef);
        //       }
        //     } else if (type === 'sms') {
        //       if (element2.sms === 'YES') {
        //         this.viewContainer.createEmbeddedView(this.templateRef);
        //       }
        //     } else if (type === 'email') {
        //       if (element2.email === 'YES') {
        //         this.viewContainer.createEmbeddedView(this.templateRef);
        //       }
        //     } else if (type === 'preview') {
        //       if (element2.preview === 'YES') {
        //         this.viewContainer.createEmbeddedView(this.templateRef);
        //       }
        //     } else if (type === 'process') {
        //       if (element2.process === 'YES') {
        //         this.viewContainer.createEmbeddedView(this.templateRef);
        //       }
        //     } else if (type === 'export') {
        //       if (element2.export === 'YES') {
        //         this.viewContainer.createEmbeddedView(this.templateRef);
        //       }
        //     } else if (type === 'noaccess') {
        //       if (element2.access === 'NO') {
        //         this.viewContainer.createEmbeddedView(this.templateRef);
        //       }
        //     } else if (type === 'noexport') {
        //       if (element2.export === 'NO') {
        //         this.viewContainer.createEmbeddedView(this.templateRef);
        //       }
        //     }
        //   }
        // });
     
        element1.screens.forEach((element2: any) => {
          if (element2.screenname.toLowerCase() === idArray[0].toLowerCase()) {
            
            // Step 1: Set all string values to "YES" if usercode is '1'
            if (this.data.authorizationResponse.usercode === '1') {
              Object.keys(element2).forEach(key => {
                if (typeof element2[key] === 'string') {
                  element2[key] = "YES";
                }
              });
            }
        
            // Step 2: Define valid permission types
            const validTypes = ['access', 'save', 'update', 'delete', 'print', 'sms', 'email', 'preview', 'process', 'export'];
            
            // Step 3: Check if type is a valid permission
            if (validTypes.includes(type) && element2[type] === 'YES') {
              this.viewContainer.createEmbeddedView(this.templateRef);
            } 
            // Step 4: Handle "no" permissions dynamically (e.g., 'noaccess', 'noexport')
            else if (type.startsWith('no')) {
              const permissionType = type.substring(2); // Remove "no" prefix (e.g., "noaccess" -> "access")
              if (element2[permissionType] === 'NO') {
                this.viewContainer.createEmbeddedView(this.templateRef);
              }
            }
          }
        });

      }
    });
  }

  setCatFn(type:any):any  {
    switch (type) {
      case 'v':
        return 'access';
      case 'vNO':
        return 'noaccess';
      case 'a':
        return 'save';
      case 'e':
        return 'update';
      case 'd':
        return 'delete';
      case 'p':
        return 'print';
      case 'sms':
        return 'sms';
      case 'email':
        return 'email';
      case 'pv':
        return 'preview';
      case 'pc':
        return 'process';
      case 'ex':
        return 'export';
      case 'exNO':
        return 'noexport';
    }
  }

}
