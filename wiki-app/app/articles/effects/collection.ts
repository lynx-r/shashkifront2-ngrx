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

import * as collection from '../actions/collection';
import { ArticleService } from '../../core/services/article.service';
import { Article } from '../models/article';

@Injectable()
export class CollectionEffects {
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
    .ofType(collection.LOAD)
    .map((action: collection.Load) => action.payload)
    .mergeMap(limit =>
      this.articleService
        .listArticles(limit)
        .map((articles: Article[]) => new collection.LoadSuccess(articles))
        .catch(error => of(new collection.LoadFail(error)))
    );

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
