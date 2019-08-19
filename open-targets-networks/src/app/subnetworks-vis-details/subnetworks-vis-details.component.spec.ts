import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetworksVisDetailsComponent } from './subnetworks-vis-details.component';

describe('SubnetworksVisDetailsComponent', () => {
  let component: SubnetworksVisDetailsComponent;
  let fixture: ComponentFixture<SubnetworksVisDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubnetworksVisDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetworksVisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
