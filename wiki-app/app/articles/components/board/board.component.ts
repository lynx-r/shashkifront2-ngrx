import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { BoardBox } from '../../models/board-box';
import 'rxjs/add/observable/of';
import { Rules } from '../../models/rules';
import { Square } from '../../models/square';
import { MdGridList, MdGridTile } from '@angular/material';

@Component({
  selector: 'ac-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnChanges {
  @Input() board: BoardBox;
  @Output() squareClicked = new EventEmitter<Square>();

  boardLength: Array<number>;
  squares: Square[];
  boardDim: number;

  constructor() {}

  ngOnChanges() {
    console.log('CHANGE', this.board);
    this.updateBoard(this.board);
  }

  private updateBoard(boardBox: BoardBox) {
    if (boardBox) {
      let board = boardBox.board;
      this.boardDim = Rules.getDimension(board.rules) + 1;
      this.boardLength = Rules.getAllBoardLength(this.boardDim);
      this.squares = [];
      let index = 0;
      for (let v = 0; v < this.boardDim; v++) {
        for (let h = 0; h < this.boardDim; h++) {
          if (h == 0) {
            this.squares.push(null);
          } else {
            this.squares.push(board.squares[index]);
            index += 1;
          }
        }
      }
    }
  }
}
