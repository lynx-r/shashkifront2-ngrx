import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { of } from 'rxjs/observable/of';

import * as article from '../actions/article';
import { Article } from '../models/article';
import { ArticleService } from '../../core/services/article.service';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class ArticleEffects {
  @Effect()
  create$: Observable<Action> = this.actions$
    .ofType(article.CREATE)
    .map((action: article.Create) => action.payload)
    .mergeMap(createArticle =>
      this.articleService
        .createArticle(createArticle)
        .map(
          (createdArticle: Article) => new article.CreateSuccess(createdArticle)
        )
        .catch(() => of(new article.CreateFail(createArticle)))
    );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number = 300,
    /**
               * You inject an optional Scheduler that will be undefined
               * in normal application usage, but its injected here so that you can mock out
               * during testing using the RxJS TestScheduler for simulating passages of time.
               */
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
  ) {}
}
