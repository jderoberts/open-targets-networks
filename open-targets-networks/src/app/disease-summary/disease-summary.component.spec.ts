import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseSummaryComponent } from './disease-summary.component';

describe('DiseaseSummaryComponent', () => {
  let component: DiseaseSummaryComponent;
  let fixture: ComponentFixture<DiseaseSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
