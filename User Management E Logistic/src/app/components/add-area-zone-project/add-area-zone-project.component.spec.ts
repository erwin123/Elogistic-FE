import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAreaZoneProjectComponent } from './add-area-zone-project.component';

describe('AddAreaZoneProjectComponent', () => {
  let component: AddAreaZoneProjectComponent;
  let fixture: ComponentFixture<AddAreaZoneProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAreaZoneProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAreaZoneProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
