import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobOrderStatusCompletedPage } from './job-order-status-completed.page';

describe('JobOrderStatusCompletedPage', () => {
  let component: JobOrderStatusCompletedPage;
  let fixture: ComponentFixture<JobOrderStatusCompletedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOrderStatusCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
