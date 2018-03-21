import { TestBed, inject } from '@angular/core/testing';

import { EfoService } from './efo.service';

describe('EfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EfoService]
    });
  });

  it('should be created', inject([EfoService], (service: EfoService) => {
    expect(service).toBeTruthy();
  }));
});
