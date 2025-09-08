import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobOrderStatusPage } from './job-order-status.page';

describe('JobOrderStatusPage', () => {
  let component: JobOrderStatusPage;
  let fixture: ComponentFixture<JobOrderStatusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOrderStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
