import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  public sideMenuOverlayRef!: OverlayRef;
  public searchboxOverlayRef!: OverlayRef;

  isSearchboxOpen = false;

  constructor() {}

  public detachSideMenu() {
    if (this.sideMenuOverlayRef) {
      if (this.sideMenuOverlayRef.hasAttached()) {
        // this.sideMenuOverlayRef.detach();
        this.sideMenuOverlayRef.dispose();
      }
    }
  }
  public detachSearchBox() {
    if (this.searchboxOverlayRef) {
      if (this.searchboxOverlayRef.hasAttached()) {
        this.isSearchboxOpen = false;
        // this.sideMenuOverlayRef.detach();
        this.searchboxOverlayRef.dispose();
      }
    }
  }
}
