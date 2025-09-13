import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { AppStorageService } from '../../services/app-storage/app-storage.service';

@Directive({
  selector: '[appEditionIf]'
})
export class EditionIfDirective {
  access: any;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>, 
    public storage: AppStorageService,
    public data: DataService,
    ) {
    this.viewContainer.clear();
  }


  @Input() set appEditionIf(id: string) {
    this.storage.get('authorizationResponse').then((val:any) => {
      if (val) {
        this.access = val;
        this.GetAll(id);
      } else {}
    });
  }
  
  GetAll(id:any) {
    const idArray = id.split('-');
    const type = this.setCatFn(idArray[1]);
    const roles = this.access.edition_features;
  
    const headArray = [
      'quotation',
      'salesorder',
      'customerdc',
      'goodsissue',
      'branchstocktransfer',
      'sales_invoice',
      'sales_pos',
      'salesreturn',
      'salesexchange',
      'sales_acknowledgement',
      'indent',
      'po',
      'purchase',
      'inward',
      'inward_inspection',
      'purchasereturn',
      'supplierdc',
      'productconversion',
      'wastage',
      'openingstocks',
      'godowntransfer',
      'stock_release',
      'stock_audit_checking',
      'receipts',
      'payments',
      'journal',
      'debit_note',
      'credit_note',
      'contra',
      'pdc',
      'party_opening_bills',
      'ledger_opening_balance',
      'matrix_stocks_management',
      'serial_stocks_management',
      'batch_stocks_management',
      'approval_systems',
      'counter_management',
      'coupen_management',
      'customer_loyalities',
      'customerwise_pricing',
      'freeoffer',
      'multiwarehouses',
      'multicurrency_management',
      'brs_management',
      'sales_target_management',
      'cost_center_management',
      'tcs_collections',
      'useraccess_and_rightscontrols',
      'sms_and_email_communications',
      'tally_export',
      'production'
    ];
  
    for (let i = 0; i < headArray.length; i++) {
      if (idArray[0] === headArray[i]) {
        if (roles[headArray[i]] === type) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } 
      }
    }
  }

  setCatFn(type:any):any {
    switch (type) {
      case 'y':
        return 'YES';
      case 'n':
        return 'NO';
    }
  }
}
