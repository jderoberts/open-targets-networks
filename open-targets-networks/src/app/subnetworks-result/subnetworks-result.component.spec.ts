import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetworksResultComponent } from './subnetworks-result.component';

describe('SubnetworksResultComponent', () => {
  let component: SubnetworksResultComponent;
  let fixture: ComponentFixture<SubnetworksResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubnetworksResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetworksResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
