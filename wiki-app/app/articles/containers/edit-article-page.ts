import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';
import * as article from '../actions/article';
import * as board from '../actions/board';
import * as toolbar from '../actions/toolbar';
import { Article } from '../models/article';
import { Observable } from 'rxjs/Observable';
import { BoardBox } from '../models/board-box';
import { Square } from '../models/square';
import { AppConstants } from '../../core/services/app-constants';
import * as fromArticles from '../reducers';
import * as createArticle from '../actions/create-article';
import {
  getBoardMode,
  getClickedSquare,
  getOpenCreateArticleDialog,
  getSelectedBoard,
  getSelectedDraught,
} from '../reducers/index';
import { DialogService } from '../services/dialog.service';
import { Draught } from '../models/draught';
import { OpenCreateArticleDialog } from '../actions/toolbar';
import { Utils } from '../../core/services/utils.service';
import { Board } from '../models/board';
import { NotationStroke } from '../models/notation-stroke';
import { BoardIdNotation } from '../models/boardid-notation';
import { Notation } from '../models/notation';

@Component({
  selector: 'ac-create-article-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ac-editor [edit]="true"
               [article]="article$ | async"
               [boardBox]="boardBox$ | async"
               [notation]="notation$ | async"
               (loadBoard)="handleLoadBoard($event)"
    ></ac-editor>
  `,
})
export class EditArticlePageComponent implements OnDestroy {
  articleSubscription: Subscription;
  boardSubscription: Subscription;
  private openCreateArticleDialogSubscription: Subscription;
  private squareClickSubscription: Subscription;
  private selectDraughtSubscription: Subscription;

  article$: Observable<Article>;
  boardBox$: Observable<BoardBox>;
  notation$: Observable<Notation>;

  selectedDraught$: Observable<Draught>;
  draught: Draught;

  mode: string;

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
    this.boardBox$ = this.store
      .select(fromArticles.getSelectedBoard)
      .do(boardBox =>
        this.store.select(getBoardMode).do(mode => {
          if (mode !== this.mode) {
            if (!!boardBox) {
              Utils.resetSquaresOnBoardBox(boardBox);
            }
            this.mode = mode;
          }
        })
      );

    this.notation$ = this.store
      .select(fromArticles.getSelectedBoard)
      .map(boardBox => {
        if (!!boardBox) {
          return this.formatNotation(boardBox.notation);
        } else {
          return null;
        }
      });

    this.selectedDraught$ = this.store.select(fromArticles.getSelectedDraught);

    this.selectDraughtSubscription = this.store
      .select(getSelectedDraught)
      .subscribe(draught => (this.draught = draught));

    this.openCreateArticleDialogSubscription = this.store
      .select(getOpenCreateArticleDialog)
      .subscribe(isOpen => isOpen && this.openCreateArticleDialog());
    this.squareClickSubscription = this.store
      .select(getClickedSquare)
      .subscribe(square => !!square && this.onSquareClicked(square));
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
    this.boardSubscription.unsubscribe();
    this.openCreateArticleDialogSubscription.unsubscribe();
    this.squareClickSubscription.unsubscribe();
    this.selectDraughtSubscription.unsubscribe();
  }

  onSquareClicked(clicked: Square) {
    this.store
      .select(fromArticles.getBoardMode)
      .do(mode => {
        this.store
          .select(fromArticles.getSelectedBoard)
          .do((selectedBoard: BoardBox) => {
            if (!!selectedBoard) {
              console.log('USING MODE ', mode);
              console.log('CLICKED ', clicked);
              if (mode == AppConstants.WRITE_MODE) {
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
    console.log('MOVE ', updated);
    this.store.dispatch(new board.Move(updated));
  }

  private highlightSquare(selectedBoard: BoardBox, clicked: Square) {
    let isOwnSquare =
      selectedBoard && selectedBoard.board.blackTurn == clicked.draught.black;
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

  formatNotation(notation: Notation): Notation {
    console.log('NOTATION', notation);
    return notation;
  }

  handleLoadBoard(boardId: string) {
    this.store
      .select(getSelectedBoard)
      .do((boardBox: BoardBox) => {
        let updated = {
          ...boardBox,
          boardId: boardId,
        };
        this.store.dispatch(new toolbar.UpdateBoardBox(updated));
      })
      .take(1)
      .subscribe();
  }
}
