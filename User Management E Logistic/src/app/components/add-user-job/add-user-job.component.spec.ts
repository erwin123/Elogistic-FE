import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserJobComponent } from './add-user-job.component';

describe('AddUserJobComponent', () => {
  let component: AddUserJobComponent;
  let fixture: ComponentFixture<AddUserJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
