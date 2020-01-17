import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListZoneProjectComponent } from './list-zone-project.component';

describe('ListZoneProjectComponent', () => {
  let component: ListZoneProjectComponent;
  let fixture: ComponentFixture<ListZoneProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListZoneProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListZoneProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
