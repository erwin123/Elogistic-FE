import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingMaterialComponent } from './outgoing-material.component';

describe('OutgoingMaterialComponent', () => {
  let component: OutgoingMaterialComponent;
  let fixture: ComponentFixture<OutgoingMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
