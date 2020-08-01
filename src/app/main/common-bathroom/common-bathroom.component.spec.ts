import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonBathroomComponent } from './common-bathroom.component';

describe('CommonBathroomComponent', () => {
  let component: CommonBathroomComponent;
  let fixture: ComponentFixture<CommonBathroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonBathroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonBathroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
