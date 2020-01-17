import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAreaZoneProjectComponent } from './list-area-zone-project.component';

describe('ListAreaZoneProjectComponent', () => {
  let component: ListAreaZoneProjectComponent;
  let fixture: ComponentFixture<ListAreaZoneProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAreaZoneProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAreaZoneProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
