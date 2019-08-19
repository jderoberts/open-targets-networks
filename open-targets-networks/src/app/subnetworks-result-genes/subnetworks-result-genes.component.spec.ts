import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetworksResultGenesComponent } from './subnetworks-result-genes.component';

describe('SubnetworksResultGenesComponent', () => {
  let component: SubnetworksResultGenesComponent;
  let fixture: ComponentFixture<SubnetworksResultGenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubnetworksResultGenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetworksResultGenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
