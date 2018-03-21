import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetworksDefaultComponent } from './subnetworks-default.component';

describe('SubnetworksDefaultComponent', () => {
  let component: SubnetworksDefaultComponent;
  let fixture: ComponentFixture<SubnetworksDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubnetworksDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetworksDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
