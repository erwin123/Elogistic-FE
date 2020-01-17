import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserProjectZoneComponent } from './add-user-project-zone.component';

describe('AddUserProjectZoneComponent', () => {
  let component: AddUserProjectZoneComponent;
  let fixture: ComponentFixture<AddUserProjectZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserProjectZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserProjectZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
