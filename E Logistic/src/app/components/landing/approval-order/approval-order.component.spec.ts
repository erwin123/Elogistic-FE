import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalOrderComponent } from './approval-order.component';

describe('ApprovalOrderComponent', () => {
  let component: ApprovalOrderComponent;
  let fixture: ComponentFixture<ApprovalOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
