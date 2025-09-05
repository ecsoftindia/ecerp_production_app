import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobOrderDetailedPage } from './job-order-detailed.page';

describe('JobOrderDetailedPage', () => {
  let component: JobOrderDetailedPage;
  let fixture: ComponentFixture<JobOrderDetailedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOrderDetailedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
