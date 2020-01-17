import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationRoleComponent } from './add-application-role.component';

describe('AddApplicationRoleComponent', () => {
  let component: AddApplicationRoleComponent;
  let fixture: ComponentFixture<AddApplicationRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApplicationRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicationRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
