import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as fromArticles from '../reducers';
import * as article from '../actions/article';
import * as board from '../actions/board';
import { ArticleService } from '../../core/services/article.service';
import { Article } from '../models/article';
import { BoardService } from '../../core/services/board.service';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class ArticleExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromArticles.State>,
    private articleService: ArticleService,
    private boardService: BoardService,
    private router: Router
  ) {}

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForCollectionToLoad(): Observable<boolean> {
    return (
      this.store
        .select(fromArticles.getSelectedArticle)
        // .map(
        //   (articleSelected: Article) =>
        //     !!articleSelected && new board.Select(articleSelected.boardId)
        // )
        // .do(
        //   (boardAction: board.Select) =>
        //     !!boardAction && this.store.dispatch(boardAction)
        // )
        .map(selected => !!selected)
    );
  }

  /**
   * This method checks if a article with the given ID is already registered
   * in the Store
   */
  hasArticleInStore(id: string): Observable<boolean> {
    return this.store
      .select(fromArticles.getArticleEntities)
      .map(entities => !!entities[id] && entities[id].boardId)
      .switchMap(boardId =>
        this.store
          .select(fromArticles.getBoardEntities)
          .map(entities => !!boardId && !!entities[boardId])
          .take(1)
      );
  }

  /**
   * This method loads a article with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasArticleInApi(id: string): Observable<boolean> {
    return this.articleService
      .findArticleById(id)
      .map(articleEntity => new article.Load(articleEntity))
      .switchMap((articleLoad: article.Load) => {
        return this.boardService
          .findBoardById(articleLoad.payload.boardId)
          .map(boardEntity => new board.Load(boardEntity))
          .do((action: board.Load) => this.store.dispatch(action))
          .map(() => articleLoad);
      })
      .do((action: article.Load) => this.store.dispatch(action))
      .map(articleLoad => !!articleLoad)
      .catch(() => {
        this.router.navigate(['/404']);
        return of(false);
      });
  }

  /**
   * `hasArticle` composes `hasArticleInStore` and `hasArticleInApi`. It first checks
   * if the article is in store, and if not it then checks if it is in the
   * API.
   */
  hasArticle(id: string): Observable<boolean> {
    // return this.hasArticleInApi(id);
    return this.hasArticleInStore(id).switchMap(inStore => {
      if (inStore) {
        return of(inStore);
      }

      return this.hasArticleInApi(id);
    });
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a article from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCollectionToLoad().switchMap(() =>
      this.hasArticle(route.params['id'])
    );
  }
}
