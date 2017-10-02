import { ElementRef, EventEmitter, Injectable, Output } from '@angular/core';
import { Utils } from './utils.service';
import { AppConstants } from './app-constants';
import { ApiBoardService } from './api-board.service';
import 'rxjs/Rx';
import { BoardBox } from '../../articles/models/board-box';
import { Move } from '../../articles/models/move';
import { Article } from '../../articles/models/article';
import { Square } from '../../articles/models/square';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BoardService {
  board: BoardBox;

  @Output() moveToSquareEvent = new EventEmitter<Move>();
  article: Article;

  constructor(private apiBoardService: ApiBoardService) {}
  addDraught(boardBox: BoardBox): Observable<BoardBox> {
    return this.apiBoardService.post(
      AppConstants.BOARD_RESOURCE + '/add-draught',
      this.resetSquaresOnBoard(boardBox)
    );
  }

  undo(boardBox: BoardBox) {
    return this.apiBoardService.post(
      AppConstants.BOARD_RESOURCE + AppConstants.UNDO,
      this.resetSquaresOnBoard(boardBox)
    );
  }

  redo(boardBox: BoardBox) {
    return this.apiBoardService.post(
      AppConstants.BOARD_RESOURCE + AppConstants.REDO,
      this.resetSquaresOnBoard(boardBox)
    );
  }

  findBoardById(boardId: string): Observable<BoardBox> {
    return this.apiBoardService.get(
      AppConstants.BOARD_RESOURCE + `/${boardId}`
    );
  }

  listBoards(boardIds: string[]): Observable<BoardBox[]> {
    return this.apiBoardService.post(AppConstants.BOARDS_RESOURCE, boardIds);
  }

  findByArticleId(articleId: string) {
    return this.apiBoardService.get(
      AppConstants.BOARD_RESOURCE + `/article/${articleId}`
    );
  }

  highlightBoard(board: BoardBox): Observable<BoardBox> {
    return this.apiBoardService.post(
      AppConstants.BOARD_RESOURCE + '/highlight',
      this.resetSquaresOnBoard(board)
    );
  }

  move(board: BoardBox) {
    return this.apiBoardService.post(
      AppConstants.BOARD_RESOURCE + '/move',
      this.resetSquaresOnBoard(board)
    );
  }

  makeWhiteStroke(boardBox: BoardBox) {
    return this.apiBoardService.post(
      AppConstants.BOARD_RESOURCE + '/make-white-stroke',
      this.resetSquaresOnBoard(boardBox)
    );
  }

  private resetSquaresOnBoard(board: BoardBox) {
    return {
      ...board,
      board: {
        ...board.board,
        squares: null,
      },
    };
  }
}
