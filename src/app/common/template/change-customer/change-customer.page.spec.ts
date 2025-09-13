import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeCustomerPage } from './change-customer.page';

describe('ChangeCustomerPage', () => {
  let component: ChangeCustomerPage;
  let fixture: ComponentFixture<ChangeCustomerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
