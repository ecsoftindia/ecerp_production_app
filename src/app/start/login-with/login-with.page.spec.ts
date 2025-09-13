import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginWithPage } from './login-with.page';

describe('LoginWithPage', () => {
  let component: LoginWithPage;
  let fixture: ComponentFixture<LoginWithPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
