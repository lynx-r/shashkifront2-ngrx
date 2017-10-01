import { TestBed, inject } from '@angular/core/testing';

import { ApiBoardService } from './api-board.service';

describe('ApiBoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiBoardService],
    });
  });

  it(
    'should ...',
    inject([ApiBoardService], (service: ApiBoardService) => {
      expect(service).toBeTruthy();
    })
  );
});
