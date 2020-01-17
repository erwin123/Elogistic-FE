import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingRecieveComponent } from './outstanding-recieve.component';

describe('OutstandingRecieveComponent', () => {
  let component: OutstandingRecieveComponent;
  let fixture: ComponentFixture<OutstandingRecieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingRecieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingRecieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
