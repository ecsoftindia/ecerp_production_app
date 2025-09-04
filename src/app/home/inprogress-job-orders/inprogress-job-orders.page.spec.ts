import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InprogressJobOrdersPage } from './inprogress-job-orders.page';

describe('InprogressJobOrdersPage', () => {
  let component: InprogressJobOrdersPage;
  let fixture: ComponentFixture<InprogressJobOrdersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InprogressJobOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
