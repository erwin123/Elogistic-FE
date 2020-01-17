import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLeadTimeComponent } from './report-lead-time.component';

describe('ReportLeadTimeComponent', () => {
  let component: ReportLeadTimeComponent;
  let fixture: ComponentFixture<ReportLeadTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLeadTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLeadTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
