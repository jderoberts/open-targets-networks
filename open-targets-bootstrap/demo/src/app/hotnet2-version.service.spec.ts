import { TestBed, inject } from '@angular/core/testing';

import { Hotnet2VersionService } from './hotnet2-version.service';

describe('Hotnet2VersionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Hotnet2VersionService]
    });
  });

  it('should be created', inject([Hotnet2VersionService], (service: Hotnet2VersionService) => {
    expect(service).toBeTruthy();
  }));
});
