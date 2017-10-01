import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as toolbar from '../actions/toolbar';
import { ArticleService } from '../../core/services/article.service';
import { of } from 'rxjs/observable/of';
import * as article from '../actions/article';
import { Injectable } from '@angular/core';

@Injectable()
export class ToolbarEffects {
  @Effect()
  saveArticle$: Observable<Action> = this.actions$
    .ofType(toolbar.SAVE_ARTICLE)
    .map((action: toolbar.SaveArticle) => action.payload)
    .switchMap(saving => this.articleService.saveArticle(saving))
    .map(saved => new article.Load(saved))
    .catch(err => of(new article.LoadFail(err)));

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) {}
}
