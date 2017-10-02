import { EventEmitter, Injectable, Output } from '@angular/core';
import { Utils } from './utils.service';
import { AppConstants } from './app-constants';
import { ApiBoardService } from './api-board.service';
import 'rxjs/Rx';
import { BoardBox } from '../../articles/models/board-box';
import { Move } from '../../articles/models/move';
import { Article } from '../../articles/models/article';
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
      Utils.resetSquaresOnBoardBox(boardBox)
    );
  }

  undo(boardBox: BoardBox) {
    return this.apiBoardService.post(
      AppConstants.BOARD_RESOURCE + AppConstants.UNDO,
      Utils.resetSquaresOnBoardBox(boardBox)
    );
  }

  redo(boardBox: BoardBox) {
    return this.apiBoardService.post(
      AppConstants.BOARD_RESOURCE + AppConstants.REDO,
      Utils.resetSquaresOnBoardBox(boardBox)
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
      Utils.resetSquaresOnBoardBox(board)
    );
  }

  move(board: BoardBox) {
    return this.apiBoardService.post(
      AppConstants.BOARD_RESOURCE + '/move',
      Utils.resetSquaresOnBoardBox(board)
    );
  }

  makeWhiteStroke(boardBox: BoardBox) {
    return this.apiBoardService.post(
      AppConstants.BOARD_RESOURCE + '/make-white-stroke',
      Utils.resetSquaresOnBoardBox(boardBox)
    );
  }
}
