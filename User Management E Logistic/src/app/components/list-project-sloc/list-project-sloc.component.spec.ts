import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectSlocComponent } from './list-project-sloc.component';

describe('ListProjectSlocComponent', () => {
  let component: ListProjectSlocComponent;
  let fixture: ComponentFixture<ListProjectSlocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjectSlocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjectSlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
