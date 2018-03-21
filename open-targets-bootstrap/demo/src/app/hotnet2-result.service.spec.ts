import { TestBed, inject } from '@angular/core/testing';

import { Hotnet2ResultService } from './hotnet2-result.service';

describe('Hotnet2ResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Hotnet2ResultService]
    });
  });

  it('should be created', inject([Hotnet2ResultService], (service: Hotnet2ResultService) => {
    expect(service).toBeTruthy();
  }));
});
