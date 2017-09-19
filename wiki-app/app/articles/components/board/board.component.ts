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

  boardLength: Array<number>;
  boardChunk: Array<number>[];
  squares: Square[];
  boardDim: number;

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
      console.log('BOARD', board.rules);
      this.boardDim = Rules.getDimension(board.rules);
      console.log(this.boardDim);
      this.boardLength = Rules.getBoardLength(board.rules);
      this.boardChunk = Rules.getChunk(
        this.boardLength,
        Rules.getDimension(board.rules)
      );
      this.board = board;
      if (this.board.boardHistoryId) {
        this.squares = this.board.boardHistoryId.squares;
      } else {
        this.squares = [];
      }
    }
  }
}
