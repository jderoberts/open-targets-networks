import { TestBed, inject } from '@angular/core/testing';

import { OtAssociationsService } from './ot-associations.service';

describe('OtAssociationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtAssociationsService]
    });
  });

  it('should be created', inject([OtAssociationsService], (service: OtAssociationsService) => {
    expect(service).toBeTruthy();
  }));
});
