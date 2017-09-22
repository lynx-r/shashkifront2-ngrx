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
import { MdDialog } from '@angular/material';
import { CreateArticleDialogComponent } from '../components/board-toolbar/dialogs/create-article-dialog/create-article-dialog.component';
import { CreateArticleRequest } from '../models/create-article-request';
import { Rules } from '../models/rules';
import * as fromArticles from '../reducers';
import * as createArticle from '../actions/create-article';
import { getSelectedBoard } from '../reducers/index';

@Component({
  selector: 'ac-create-article-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ac-editor [article]="article$ | async"
               [board]="board$ | async"
               (editToggled)="toggleEdit($event)"
               (squareClicked)="onSquareClicked($event)"
               (openCreateArticleDialog)="openCreateArticleDialog()"
               (undo)="onUndoClicked()"
               (redo)="onRedoClicked()"
    ></ac-editor>
  `,
})
export class EditArticlePageComponent implements OnDestroy {
  articleSubscription: Subscription;
  boardSubscription: Subscription;

  article$: Observable<Article>;
  board$: Observable<BoardBox>;
  boardMode$: Observable<string>;
  checkedMode$: Observable<string>;

  private initialArticle: CreateArticleRequest;

  constructor(
    private store: Store<fromArticles.State>,
    private route: ActivatedRoute,
    private dialog: MdDialog
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

    this.checkedMode$ = this.store.select(fromArticles.getBoardMode);

    this.initialArticle = {
      article: {
        id: '',
        createdAt: new Date(),
        title: 'Новая статья',
        content: '',
        author: '',
        boardBoxId: '',
      },
      boardRequest: {
        black: false,
        rules: Rules.RUSSIAN,
        fillBoard: false,
      },
    };
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
    this.boardSubscription.unsubscribe();
  }

  onSquareClicked(clicked: Square) {
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

  private copyBoard(selectedBoard: BoardBox, clicked: Square) {
    return;
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
      selectedBoard && clicked.draught.black == selectedBoard.board.black;
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
    let openDialogHref = this.dialog.open(CreateArticleDialogComponent, {
      data: this.initialArticle,
      width: '400px',
    });
    openDialogHref.afterClosed().subscribe(result => {
      !!result && this.store.dispatch(new createArticle.Create(result));
    });
  }

  toggleEdit(mode: string) {
    this.store.dispatch(new board.Mode(mode));
  }

  onUndoClicked() {
    this.store
      .select(getSelectedBoard)
      .do((selected: BoardBox) => this.store.dispatch(new board.Undo(selected)))
      .take(1)
      .subscribe();
  }

  onRedoClicked() {}
}
