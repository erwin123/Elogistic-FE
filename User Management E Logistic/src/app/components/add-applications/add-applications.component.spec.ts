import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationsComponent } from './add-applications.component';

describe('AddApplicationsComponent', () => {
  let component: AddApplicationsComponent;
  let fixture: ComponentFixture<AddApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
