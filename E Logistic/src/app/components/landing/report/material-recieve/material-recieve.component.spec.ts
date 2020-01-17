import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRecieveComponent } from './material-recieve.component';

describe('MaterialRecieveComponent', () => {
  let component: MaterialRecieveComponent;
  let fixture: ComponentFixture<MaterialRecieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialRecieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialRecieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
