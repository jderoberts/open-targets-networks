import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetworksQueueComponent } from './subnetworks-queue.component';

describe('SubnetworksQueueComponent', () => {
  let component: SubnetworksQueueComponent;
  let fixture: ComponentFixture<SubnetworksQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubnetworksQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetworksQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
