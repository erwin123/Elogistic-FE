import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportComparisonComponent } from './report-comparison.component';

describe('ReportComparisonComponent', () => {
  let component: ReportComparisonComponent;
  let fixture: ComponentFixture<ReportComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
