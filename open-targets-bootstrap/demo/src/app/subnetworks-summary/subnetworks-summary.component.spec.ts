import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetworksSummaryComponent } from './subnetworks-summary.component';

describe('SubnetworksSummaryComponent', () => {
  let component: SubnetworksSummaryComponent;
  let fixture: ComponentFixture<SubnetworksSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubnetworksSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetworksSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
