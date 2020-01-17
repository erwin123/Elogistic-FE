import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserJobComponent } from './list-user-job.component';

describe('ListUserJobComponent', () => {
  let component: ListUserJobComponent;
  let fixture: ComponentFixture<ListUserJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
