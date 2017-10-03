import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as articleCollection from '../actions/article-collection';
import * as boardCollection from '../actions/board-collection';
import { ArticleService } from '../../core/services/article.service';
import { Article } from '../models/article';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable()
export class CollectionEffects {
  @BlockUI() blockUI: NgBlockUI;

  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(articleCollection.LOAD)
    .do(() => this.blockUI.start())
    .map((action: articleCollection.Load) => action.payload)
    .mergeMap(limit =>
      this.articleService
        .listArticles(limit)
        .map(
          (articles: Article[]) => new articleCollection.LoadSuccess(articles)
        )
    )
    .do(() => this.blockUI.stop())
    .catch(error => of(new articleCollection.LoadFail(error)));

  // @Effect()
  // loadBoardCollection$: Observable<Action> = this.actions$
  //   .ofType(boardCollection.LOAD)
  //   .do(() => this.blockUI.start())
  //   .map((action: boardCollection.Load) => action.payload)
  //   .switchMap((boardIds: string[]) =>
  //     this.boardBoxService
  //       .listBoards(boardIds)
  //       .map((boards: BoardBox[]) => new boardCollection.LoadSuccess(boards))
  //       .catch(error => of(new boardCollection.LoadFail(error)))
  //   )
  //   .do(() => this.blockUI.stop())
  //   .catch(error => of(new boardCollection.LoadFail(error)));

  // @Effect()
  // addBookToCollection$: Observable<Action> = this.actions$
  //   .ofType(collection.ADD_BOOK)
  //   .map((action: collection.AddBook) => action.payload)
  //   .mergeMap(book =>
  //     this.db
  //       .insert('books', [book])
  //       .map(() => new collection.AddBookSuccess(book))
  //       .catch(() => of(new collection.AddBookFail(book)))
  //   );
  //
  // @Effect()
  // removeBookFromCollection$: Observable<Action> = this.actions$
  //   .ofType(collection.REMOVE_BOOK)
  //   .map((action: collection.RemoveBook) => action.payload)
  //   .mergeMap(book =>
  //     this.db
  //       .executeWrite('books', 'delete', [book.id])
  //       .map(() => new collection.RemoveBookSuccess(book))
  //       .catch(() => of(new collection.RemoveBookFail(book)))
  //   );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) {}
}
