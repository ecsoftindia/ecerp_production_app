import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobOrderStatusDetailPage } from './job-order-status-detail.page';

describe('JobOrderStatusDetailPage', () => {
  let component: JobOrderStatusDetailPage;
  let fixture: ComponentFixture<JobOrderStatusDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOrderStatusDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
