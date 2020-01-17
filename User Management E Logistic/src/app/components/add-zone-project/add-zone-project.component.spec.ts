import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddZoneProjectComponent } from './add-zone-project.component';

describe('AddZoneProjectComponent', () => {
  let component: AddZoneProjectComponent;
  let fixture: ComponentFixture<AddZoneProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddZoneProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddZoneProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
