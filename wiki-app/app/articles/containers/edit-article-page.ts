import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';
import * as fromArticles from '../reducers';
import * as article from '../actions/article';
import * as board from '../actions/board';
import * as squareAction from '../actions/square';
import { Article } from '../models/article';
import { Observable } from 'rxjs/Observable';
import { Board } from '../models/board';
import { Square } from '../models/square';

@Component({
  selector: 'ac-create-article-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ac-editor [article]="article$ | async"
               [board]="board$ | async"
               [mode]="boardMode$ | async"
               (squareClicked)="onSquareClicked($event)"
    ></ac-editor>
  `,
})
export class EditArticlePageComponent implements OnDestroy {
  articleSubscription: Subscription;
  boardSubscription: Subscription;

  article$: Observable<Article>;
  board$: Observable<Board>;
  boardMode$: Observable<string>;

  constructor(
    private store: Store<fromArticles.State>,
    private route: ActivatedRoute
  ) {
    this.articleSubscription = route.params
      .map(params => new article.Select(params.id))
      .subscribe(store);
    this.boardSubscription = this.store
      .select(fromArticles.getSelectedArticle)
      .map(
        articleEntity =>
          !!articleEntity && new board.Select(articleEntity.boardId)
      )
      .map(select => !!select && this.store.dispatch(select))
      .subscribe();

    this.article$ = this.store.select(fromArticles.getSelectedArticle);
    this.board$ = this.store.select(fromArticles.getSelectedBoard).do(board => {
      console.log('SELECTED BOARD ', board);
    });
    this.boardMode$ = this.store.select(fromArticles.getBoardMode);
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
    this.boardSubscription.unsubscribe();
  }

  onSquareClicked(clicked: Square) {
    this.store
      .select(fromArticles.getSelectedBoard)
      .do(selectedBoard => {
        if (selectedBoard) {
          selectedBoard = { ...selectedBoard, selectedSquare: clicked };
          this.store.dispatch(new board.Click(selectedBoard));
        }
      })
      .subscribe(() => {
        console.log('Clicked square', clicked);
      })
      .unsubscribe();
  }
}
