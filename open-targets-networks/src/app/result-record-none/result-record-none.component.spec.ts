import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultRecordNoneComponent } from './result-record-none.component';

describe('ResultRecordNoneComponent', () => {
  let component: ResultRecordNoneComponent;
  let fixture: ComponentFixture<ResultRecordNoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultRecordNoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultRecordNoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
