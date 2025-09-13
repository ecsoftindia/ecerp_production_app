import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  EmptySpinnerComponent,
  FullSpinnerComponent,
} from "./full-spinner.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { FullSpinnerService } from "./full-spinner.service";
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [FullSpinnerComponent, EmptySpinnerComponent],
  imports: [CommonModule, OverlayModule, MatProgressBarModule],
  exports: [FullSpinnerComponent, EmptySpinnerComponent, MatProgressBarModule],
  providers: [FullSpinnerService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FullSpinnerModule {}
