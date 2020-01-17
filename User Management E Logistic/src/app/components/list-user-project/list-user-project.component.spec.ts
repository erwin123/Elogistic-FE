import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserProjectComponent } from './list-user-project.component';

describe('ListUserProjectComponent', () => {
  let component: ListUserProjectComponent;
  let fixture: ComponentFixture<ListUserProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
