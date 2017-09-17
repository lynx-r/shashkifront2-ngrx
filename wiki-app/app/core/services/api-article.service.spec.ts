import { TestBed, inject } from '@angular/core/testing';

import { ApiArticleService } from './api-article.service';

describe('ApiArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiArticleService],
    });
  });

  it(
    'should ...',
    inject([ApiArticleService], (service: ApiArticleService) => {
      expect(service).toBeTruthy();
    })
  );
});
