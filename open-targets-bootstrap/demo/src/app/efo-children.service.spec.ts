import { TestBed, inject } from '@angular/core/testing';

import { EfoChildrenService } from './efo-children.service';

describe('EfoChildrenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EfoChildrenService]
    });
  });

  it('should be created', inject([EfoChildrenService], (service: EfoChildrenService) => {
    expect(service).toBeTruthy();
  }));
});
