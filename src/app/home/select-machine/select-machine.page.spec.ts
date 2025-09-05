import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectMachinePage } from './select-machine.page';

describe('SelectMachinePage', () => {
  let component: SelectMachinePage;
  let fixture: ComponentFixture<SelectMachinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMachinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
