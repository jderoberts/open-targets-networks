import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetworksResultDrugsComponent } from './subnetworks-result-drugs.component';

describe('SubnetworksResultDrugsComponent', () => {
  let component: SubnetworksResultDrugsComponent;
  let fixture: ComponentFixture<SubnetworksResultDrugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubnetworksResultDrugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetworksResultDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
