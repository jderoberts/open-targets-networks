import { TestBed, inject } from '@angular/core/testing';

import { OtEvidenceService } from './ot-evidence.service';

describe('OtEvidenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtEvidenceService]
    });
  });

  it('should be created', inject([OtEvidenceService], (service: OtEvidenceService) => {
    expect(service).toBeTruthy();
  }));
});
