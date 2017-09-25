import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';
import * as article from '../actions/article';
import * as board from '../actions/board';
import { Article } from '../models/article';
import { Observable } from 'rxjs/Observable';
import { BoardBox } from '../models/board-box';
import { Square } from '../models/square';
import { AppConstants } from '../../core/services/app-constants';
import * as fromArticles from '../reducers';
import * as createArticle from '../actions/create-article';
import {
  getClickedSquare,
  getOpenCreateArticleDialog,
  getSelectedDraught,
} from '../reducers/index';
import { DialogService } from '../services/dialog.service';
import { Draught } from '../models/draught';
import { OpenCreateArticleDialog } from '../actions/toolbar';

@Component({
  selector: 'ac-create-article-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ac-editor [article]="article$ | async"
               [boardBox]="boardBox$ | async"
    ></ac-editor>
  `,
})
export class EditArticlePageComponent implements OnDestroy {
  articleSubscription: Subscription;
  boardSubscription: Subscription;

  article$: Observable<Article>;
  boardBox$: Observable<BoardBox>;
  boardMode$: Observable<string>;
  checkedMode$: Observable<string>;
  selectedDraught$: Observable<Draught>;

  draught: Draught;

  constructor(
    private store: Store<fromArticles.State>,
    private route: ActivatedRoute,
    private dialogService: DialogService
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
    this.boardBox$ = this.store.select(fromArticles.getSelectedBoard);
    this.boardMode$ = this.store.select(fromArticles.getBoardMode);

    this.checkedMode$ = this.store.select(fromArticles.getBoardMode);

    this.selectedDraught$ = this.store.select(fromArticles.getSelectedDraught);

    this.store
      .select(getSelectedDraught)
      .subscribe(draught => (this.draught = draught));

    this.store
      .select(getOpenCreateArticleDialog)
      .subscribe(isOpen => isOpen && this.openCreateArticleDialog());
    this.store
      .select(getClickedSquare)
      .subscribe(square => this.onSquareClicked(square));
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
    this.boardSubscription.unsubscribe();
  }

  onSquareClicked(clicked: Square) {
    if (!clicked) {
      return;
    }
    this.store
      .select(fromArticles.getBoardMode)
      .do(mode => {
        this.store
          .select(fromArticles.getSelectedBoard)
          .do((selectedBoard: BoardBox) => {
            if (!!selectedBoard) {
              if (mode == AppConstants.WRITE_MODE) {
                console.log(clicked);
                if (clicked.draught != null) {
                  this.highlightSquare(selectedBoard, clicked);
                } else {
                  this.moveSquare(selectedBoard, clicked);
                }
              } else if (mode == AppConstants.PLACE_MODE) {
                this.addDraught(selectedBoard, clicked);
              }
            }
          })
          .take(1)
          .subscribe();
      })
      .take(1)
      .subscribe();
  }

  private moveSquare(selectedBoard: BoardBox, clicked: Square) {
    let updated = {
      ...selectedBoard,
      board: {
        ...selectedBoard.board,
        nextSquare: clicked,
      },
    };
    this.store.dispatch(new board.Move(updated));
  }

  private highlightSquare(selectedBoard: BoardBox, clicked: Square) {
    let isOwnSquare =
      selectedBoard && selectedBoard.blackTurn == clicked.draught.black;
    if (isOwnSquare) {
      let updated = {
        ...selectedBoard,
        board: {
          ...selectedBoard.board,
          selectedSquare: clicked,
        },
      };
      this.store.dispatch(new board.Click(updated));
    }
  }

  private addDraught(selectedBoard: BoardBox, clicked: Square) {
    let updated = {
      ...selectedBoard,
      board: {
        ...selectedBoard.board,
        selectedSquare: clicked,
      },
    };
    this.store.dispatch(new board.AddDraught(updated));
  }

  openCreateArticleDialog() {
    this.dialogService.createArticle().subscribe(result => {
      if (!!result) {
        this.store.dispatch(new createArticle.Create(result));
        this.store.dispatch(new OpenCreateArticleDialog(false));
      }
    });
  }
}
