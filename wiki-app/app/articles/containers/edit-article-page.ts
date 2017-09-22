import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';
import * as fromArticles from '../reducers';
import * as article from '../actions/article';
import * as board from '../actions/board';
import { Article } from '../models/article';
import { Observable } from 'rxjs/Observable';
import { BoardBox } from '../models/board-box';
import { Square } from '../models/square';
import { AppConstants } from '../../core/services/app-constants';

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
  board$: Observable<BoardBox>;
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
          !!articleEntity && new board.Select(articleEntity.boardBoxId)
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
      .select(fromArticles.getBoardMode)
      .do(mode => {
        if (mode == AppConstants.WRITE_MODE) {
          if (clicked.draught != null) {
            this.store
              .select(fromArticles.getSelectedBoard)
              .do(selectedBoard => {
                if (
                  selectedBoard &&
                  clicked.draught.black == selectedBoard.board.black
                ) {
                  selectedBoard.board = {
                    ...selectedBoard.board,
                    selectedSquare: clicked,
                  };
                  this.store.dispatch(new board.Click(selectedBoard));
                }
              })
              .take(1)
              .subscribe();
          } else {
            this.store
              .select(fromArticles.getSelectedBoard)
              .do(selectedBoard => {
                if (selectedBoard) {
                  selectedBoard.board = {
                    ...selectedBoard.board,
                    nextSquare: clicked,
                  };
                  this.store.dispatch(new board.Move(selectedBoard));
                }
              })
              .take(1)
              .subscribe();
          }
        } else if (mode == AppConstants.PLACE_MODE) {
        }
      })
      .subscribe();
  }
}
