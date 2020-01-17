import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserProjectZoneComponent } from './list-user-project-zone.component';

describe('ListUserProjectZoneComponent', () => {
  let component: ListUserProjectZoneComponent;
  let fixture: ComponentFixture<ListUserProjectZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserProjectZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserProjectZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
