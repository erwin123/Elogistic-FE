import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleJobComponent } from './add-role-job.component';

describe('AddRoleJobComponent', () => {
  let component: AddRoleJobComponent;
  let fixture: ComponentFixture<AddRoleJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoleJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoleJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
