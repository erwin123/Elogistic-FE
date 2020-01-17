import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAreaComponent } from './add-user-area.component';

describe('AddUserAreaComponent', () => {
  let component: AddUserAreaComponent;
  let fixture: ComponentFixture<AddUserAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
