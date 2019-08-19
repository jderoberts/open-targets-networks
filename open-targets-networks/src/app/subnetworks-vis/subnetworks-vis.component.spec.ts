import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetworksVisComponent } from './subnetworks-vis.component';

describe('SubnetworksVisComponent', () => {
  let component: SubnetworksVisComponent;
  let fixture: ComponentFixture<SubnetworksVisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubnetworksVisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetworksVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
