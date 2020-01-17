import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoleJobComponent } from './list-role-job.component';

describe('ListRoleJobComponent', () => {
  let component: ListRoleJobComponent;
  let fixture: ComponentFixture<ListRoleJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRoleJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoleJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
