import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Board } from '../../models/board';
import 'rxjs/add/observable/of';
import { Rules } from '../../models/rules';
import { Square } from '../../models/square';
import { MdGridList, MdGridTile } from '@angular/material';

@Component({
  selector: 'ac-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @Input() board: Board;

  boardLength: Array<number>;
  boardChunk: Array<number>[];
  squares: Square[] = [];
  boardDim: number;
  private boardSize: number[];

  constructor() {}

  ngOnInit() {
    this.updateBoard(this.board);
  }

  private updateBoard(board: Board) {
    if (board) {
      this.boardDim = Rules.getDimension(board.rules) + 1;
      this.boardLength = Rules.getAllBoardLength(this.boardDim);
      this.board = board;
      let index = 0;
      for (let v = 0; v < this.boardDim; v++) {
        for (let h = 0; h < this.boardDim; h++) {
          if (h == 0) {
            this.squares.push(null);
          } else {
            console.log(h, board.squares[index]);
            this.squares.push(board.squares[index]);
            index += 1;
          }
        }
      }
    }
  }
}
