import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationMenuComponent } from './add-application-menu.component';

describe('AddApplicationMenuComponent', () => {
  let component: AddApplicationMenuComponent;
  let fixture: ComponentFixture<AddApplicationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApplicationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
