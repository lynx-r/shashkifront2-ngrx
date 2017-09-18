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
  @Input() board: Board;

  boardDimension: Array<number>;
  boardChunk: Array<number>[];
  squares: Square[];

  constructor() {}

  ngOnInit() {
    this.updateBoard(this.board);
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
      this.boardDimension = Rules.getBoardLength(board.rules);
      this.boardChunk = Rules.getChunk(
        this.boardDimension,
        Rules.getDimension(board.rules)
      );
      this.board = board;
      if (this.board.currentBoard) {
        this.squares = this.board.currentBoard.squares;
      } else {
        this.squares = [];
      }
    }
  }
}
