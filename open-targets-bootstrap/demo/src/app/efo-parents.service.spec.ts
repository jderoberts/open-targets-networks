import { TestBed, inject } from '@angular/core/testing';

import { EfoParentsService } from './efo-parents.service';

describe('EfoParentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EfoParentsService]
    });
  });

  it('should be created', inject([EfoParentsService], (service: EfoParentsService) => {
    expect(service).toBeTruthy();
  }));
});
