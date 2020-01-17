import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApplicationRoleComponent } from './list-application-role.component';

describe('ListApplicationRoleComponent', () => {
  let component: ListApplicationRoleComponent;
  let fixture: ComponentFixture<ListApplicationRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListApplicationRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApplicationRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
