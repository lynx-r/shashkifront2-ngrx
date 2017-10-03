import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as toolbar from '../actions/toolbar';
import { ArticleService } from '../../core/services/article.service';
import { of } from 'rxjs/observable/of';
import * as article from '../actions/article';
import * as board from '../actions/board';
import { Injectable } from '@angular/core';
import { AppConstants } from '../../core/services/app-constants';
import { BoardBoxService } from '../../core/services/board-box.service';

@Injectable()
export class ToolbarEffects {
  @Effect()
  saveArticle$: Observable<Action> = this.actions$
    .ofType(toolbar.SAVE_ARTICLE)
    .debounceTime(AppConstants.DEBOUNCE_SAVE)
    .map((action: toolbar.SaveArticle) => action.payload)
    .switchMap(saving => this.articleService.saveArticle(saving))
    .map(saved => new article.Update(saved))
    .catch(err => of(new article.LoadFail(err)));

  @Effect()
  saveBoardBox: Observable<Action> = this.actions$
    .ofType(toolbar.SAVE_BOARD_BOX)
    .debounceTime(AppConstants.DEBOUNCE_SAVE)
    .map((action: toolbar.SaveBoardBox) => action.payload)
    .switchMap(saving => this.boardBoxService.saveBoardBox(saving))
    .map(saved => new board.Update(saved))
    .catch(err => of(new board.LoadFail(err)));

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private boardBoxService: BoardBoxService
  ) {}
}
