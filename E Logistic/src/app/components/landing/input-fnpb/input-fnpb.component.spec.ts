import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFnpbComponent } from './input-fnpb.component';

describe('InputFnpbComponent', () => {
  let component: InputFnpbComponent;
  let fixture: ComponentFixture<InputFnpbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFnpbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFnpbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
