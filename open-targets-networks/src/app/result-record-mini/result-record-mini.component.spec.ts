import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultRecordMiniComponent } from './result-record-mini.component';

describe('ResultRecordMiniComponent', () => {
  let component: ResultRecordMiniComponent;
  let fixture: ComponentFixture<ResultRecordMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultRecordMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultRecordMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
