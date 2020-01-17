import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserAreaComponent } from './list-user-area.component';

describe('ListUserAreaComponent', () => {
  let component: ListUserAreaComponent;
  let fixture: ComponentFixture<ListUserAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
