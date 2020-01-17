import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApplicationMenuComponent } from './list-application-menu.component';

describe('ListApplicationMenuComponent', () => {
  let component: ListApplicationMenuComponent;
  let fixture: ComponentFixture<ListApplicationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListApplicationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApplicationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
