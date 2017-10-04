import { Injectable } from '@angular/core';
import { Utils } from './utils.service';
import { AppConstants } from './app-constants';
import { ApiBoardBoxService } from './api-board-box.service';
import 'rxjs/Rx';
import { BoardBox } from '../../articles/models/board-box';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BoardBoxService {
  constructor(private apiBoardBoxService: ApiBoardBoxService) {}

  addDraught(boardBox: BoardBox): Observable<BoardBox> {
    return this.apiBoardBoxService.post(
      AppConstants.BOARD_RESOURCE + '/add-draught',
      Utils.resetSquaresOnBoardBox(boardBox)
    );
  }

  undo(boardBox: BoardBox) {
    return this.apiBoardBoxService.post(
      AppConstants.BOARD_RESOURCE + AppConstants.UNDO,
      Utils.resetSquaresOnBoardBox(boardBox)
    );
  }

  redo(boardBox: BoardBox) {
    return this.apiBoardBoxService.post(
      AppConstants.BOARD_RESOURCE + AppConstants.REDO,
      Utils.resetSquaresOnBoardBox(boardBox)
    );
  }

  findBoardById(boardId: string): Observable<BoardBox> {
    return this.apiBoardBoxService.get(
      AppConstants.BOARD_RESOURCE + `/${boardId}`
    );
  }

  listBoards(boardIds: string[]): Observable<BoardBox[]> {
    return this.apiBoardBoxService.post(AppConstants.BOARDS_RESOURCE, boardIds);
  }

  findByArticleId(articleId: string) {
    return this.apiBoardBoxService.get(
      AppConstants.BOARD_RESOURCE + `/article/${articleId}`
    );
  }

  highlightBoard(board: BoardBox): Observable<BoardBox> {
    return this.apiBoardBoxService.post(
      AppConstants.BOARD_RESOURCE + '/highlight',
      Utils.resetSquaresOnBoardBox(board)
    );
  }

  move(board: BoardBox) {
    return this.apiBoardBoxService.post(
      AppConstants.BOARD_RESOURCE + '/move',
      Utils.resetSquaresOnBoardBox(board)
    );
  }

  makeWhiteStroke(boardBox: BoardBox) {
    return this.apiBoardBoxService.post(
      AppConstants.BOARD_RESOURCE + '/make-white-stroke',
      Utils.resetSquaresOnBoardBox(boardBox)
    );
  }

  saveBoardBox(boardBox: BoardBox) {
    return this.apiBoardBoxService.put(
      AppConstants.BOARD_RESOURCE,
      Utils.resetSquaresOnBoardBox(boardBox)
    );
  }

  updateBoardBox(boardBox: BoardBox) {
    return this.apiBoardBoxService.put(
      AppConstants.BOARD_RESOURCE + '/update',
      Utils.resetSquaresOnBoardBox(boardBox)
    );
  }
}
