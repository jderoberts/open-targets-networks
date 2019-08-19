import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultRecordComponent } from './result-record.component';

describe('ResultRecordComponent', () => {
  let component: ResultRecordComponent;
  let fixture: ComponentFixture<ResultRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
