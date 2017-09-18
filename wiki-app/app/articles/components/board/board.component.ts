import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../../models/board';
import 'rxjs/add/observable/of';
import { Rules } from '../../models/rules';
import { Square } from '../../models/square';

@Component({
  selector: 'ac-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  boardDimension: Array<number>;
  boardChunk: Array<number>;
  board: Board;
  squares: Square[];

  constructor() {}

  ngOnInit() {
    // this.articleService.articleObservable().subscribe(content => {
    //   if (content.ac-board) {
    //     this.updateBoard(content.ac-board);
    //   }
    // });
    // if (this.articleService.content.ac-board) {
    //   this.boardService
    //     .findById(this.articleService.content.ac-board.id)
    // .then(ac-board => {
    //   this.updateBoard(ac-board);
    // })
    // .catch(() => {});
    // }
  }

  private updateBoard(board: Board) {
    if (board) {
      // this.boardDimension = Rules.getBoardLenth(ac-board.rules);
      // this.boardChunk = Rules.getChunk(
      //   this.boardDimension,
      //   Math.abs(Rules.getDimension(ac-board.rules))
      // );
      // this.ac-board = ac-board;
      // if (this.ac-board.currentBoard) {
      //   this.squares = this.ac-board.currentBoard.squares;
      // } else {
      //   this.squares = [];
      // }
    }
  }
}
