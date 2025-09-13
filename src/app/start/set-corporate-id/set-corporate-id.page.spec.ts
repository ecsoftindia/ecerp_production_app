import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetCorporateIdPage } from './set-corporate-id.page';

describe('SetCorporateIdPage', () => {
  let component: SetCorporateIdPage;
  let fixture: ComponentFixture<SetCorporateIdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCorporateIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
