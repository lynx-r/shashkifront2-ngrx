import { ElementRef, EventEmitter, Injectable, Output } from '@angular/core';
import { Utils } from './utils.service';
import { AppConstants } from './app-constants';
import { ApiBoardService } from './api-board.service';
import 'rxjs/Rx';
import { Board } from '../../articles/models/board';
import { Move } from '../../articles/models/move';
import { Article } from '../../articles/models/article';
import { Square } from '../../articles/models/square';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BoardService {
  board: Board;
  editModeFlag: boolean;
  selectedDraughtDescFlag: { black: boolean; queen: boolean };
  removeDraughtFlag: boolean;

  @Output() moveToSquareEvent = new EventEmitter<Move>();
  article: Article;

  constructor(private apiBoardService: ApiBoardService) {}

  //
  // get selectedDraughtDescFlag() {
  //   return this._selectedDraughtDesc;
  // }
  //
  // set selectedDraughtDescFlag(flag) {
  //   this.localStorage.store(AppConstants.SELECTED_DRAUGHT_DESC_STORAGE_KEY, flag);
  // }

  // get editModeFlag() {
  //   return this._editMode;
  // }
  //
  // set editModeFlag(mode){
  //   this.localStorage.store(AppConstants.EDIT_MODE_STORAGE_KEY, mode);
  // }

  // resetHighlight() {
  //   this.goThroughBoard((square: Square) => {
  //     if (square.main) {
  //       square.highlighted = false;
  //     }
  //   })
  // }

  // highlightAllowed(allowedSquares: Square[]) {
  //   console.log(allowedSquares);
  //   this.goThroughBoard((square) => {
  //     for (let hl of allowedSquares) {
  //       if (Utils.equalsSquares(square, hl)) {
  //         console.log(square);
  //         square.highlighted = true;
  //       }
  //     }
  //   })
  // }

  private goThroughBoard(func: Function) {
    for (let square of this.board.currentBoard.squares) {
      func(square);
    }
  }

  // moveDraught(sourceSquare: Square, draught: Draught, targetSquare: Square, queen: boolean) {
  //   sourceSquare.draught = null;
  //   sourceSquare.occupied = false;
  //   draught.h = targetSquare.h;
  //   draught.v = targetSquare.v;
  //   draught.queen = queen;
  //   targetSquare.draught = draught;
  //   targetSquare.occupied = true;
  // }

  beatDraughts(beaten: Square[]) {
    // this.goThroughBoard((square) => {
    //   for (let s of beaten) {
    //     if (s.x == square.x && s.y == square.y) {
    //       square.draught = null;
    //       square.occupied = false;
    //     }
    //   }
    // })
  }

  addDraught(param: {
    _articleId: string;
    x: number;
    y: number;
    black: boolean;
    queen: boolean;
  }) {
    // this.socketService.socket.emit(AppConstants.ADD_DRAUGHT, param, (resp) => {
    //   Utils.handleResponse(resp).then((resp) => {
    //     this.content = resp.data;
    //   })
    // })
  }

  removeDraught(param: { _articleId: string; x: number; y: number }) {
    // this.socketService.socket.emit(AppConstants.REMOVE_DRAUGHT, param, (resp) => {
    //   Utils.handleResponse(resp).then((resp) => {
    //     this.articleService.content = resp.data;
    //   })
    // })
  }

  //
  // set removeDraughtFlag(flag) {
  //   this.localStorage.store(AppConstants.REMOVE_DRAUGHT_STORAGE_KEY, flag);
  // }
  //
  // get removeDraughtFlag() {
  //   return this._removeDraught;
  // }

  // highlightAllowedFor(param: { boardId: string; selectedSquare: Square }, callback: (resp) => any) {
  // console.log(param);
  // this.apiBoardService
  //   .post(AppConstants.BOARD_RESOURCE + '/highlight', param)
  //   .subscribe((highlighted) => {
  //     this.resetHighlight();
  //     this.highlightAllowed(highlighted.allowed);
  //     callback(highlighted);
  //   });
  // }

  /**
   * spaghetti for DraughtComponent
   * @returns {Article}
   */
  // activeArticle(): Article {
  // return this.articleService.content;
  // }

  moveDraughtTo(
    params: {
      boardId: string;
      allowed: Square[];
      beaten: Square[];
      targetSquare: Square;
      selectedSquare: Square;
    },
    animParams: { draughtRefElement: Element }
  ) {
    this.apiBoardService
      .post(AppConstants.BOARD_RESOURCE + '/move', params)
      .subscribe(resp => {
        // this.moveDraughtToTween(resp, params.targetSquare, animParams.draughtRefElement);
      });
  }

  // private moveDraughtToTween(move, targetSquare: Square, target?: any) {
  // TweenLite.to(target, .3, {
  //   css: {x: `${move.h}px`, y: `${move.v}px`},
  //   ease: Linear.easeNone,
  //   onComplete: () => {
  //     // this.beatDraughts(this.beatenPos);
  //     // this.moveDraught(this.square, this.draught, targetSquare, move.queen);
  //     // this.allowedSquares = [];
  //     // this.beatenPos = [];
  //     // this.boardService.resetHighlight();
  //   }
  // });
  // }

  createBoard(params: {
    fillBoard: boolean;
    black: boolean;
    rules: number;
    squareSize: number;
  }) {
    return this.apiBoardService.post(AppConstants.BOARD_RESOURCE, params);
  }

  findById(boardId: string) {
    return new Promise((resolve, reject) => {
      // Utils.blockUI(this.blockUIService, (unblock) => {
      //   this.apiBoardService
      //     .get(AppConstants.BOARD_RESOURCE + `/${boardId}`)
      //     .subscribe((ac-board) => {
      //       this.ac-board = ac-board;
      //       resolve(ac-board);
      //       unblock();
      //     }, (err) => {
      //       reject(null);
      //       unblock();
      //     })
      // })
    });
  }

  // boardObservable() {
  //   return this.localStorage.observe(AppConstants.BOARD_STORAGE_KEY);
  // }
  undo() {
    let params = {
      boardId: this.board.id,
    };
    this.apiBoardService
      .post(AppConstants.BOARD_RESOURCE + AppConstants.UNDO, params)
      .subscribe((resp: Move) => {
        this.moveToSquareEvent.emit(resp);
      });
  }

  findBoardById(boardId: string): Observable<Board> {
    return this.apiBoardService.get(
      AppConstants.BOARD_RESOURCE + `/${boardId}`
    );
  }
}
