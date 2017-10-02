import { Component, Input, OnChanges } from '@angular/core';
import 'rxjs/add/observable/of';
import { Rules } from '../../models/rules';
import { Square } from '../../models/square';
import { Board } from '../../models/board';
import { Store } from '@ngrx/store';
import { getBoardMode, getSelectedDraught, State } from '../../reducers/index';
import { Click } from '../../actions/square';
import { AppConstants } from '../../../core/services/app-constants';

@Component({
  selector: 'ac-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnChanges {
  @Input() board: Board;

  boardLength: Array<number>;
  squares: Square[];
  boardDim: number;

  constructor(private store: Store<State>) {}

  ngOnChanges() {
    console.log('CHANGE', this.board);
    this.updateBoard();
  }

  private updateBoard() {
    if (this.board) {
      this.boardDim = Rules.getDimension(this.board.rules) + 1;
      this.boardLength = Rules.getAllBoardLength(this.boardDim);
      this.squares = [];
      let index = 0;
      for (let v = 0; v < this.boardDim; v++) {
        for (let h = 0; h < this.boardDim; h++) {
          if (h == 0) {
            this.squares.push(null);
          } else {
            this.squares.push(this.board.squares[index]);
            index += 1;
          }
        }
      }
    }
  }

  onSquareClicked(square: Square) {
    this.store
      .select(getSelectedDraught)
      .switchMap(draught =>
        this.store.select(getBoardMode).map(mode => {
          console.log('selected draught: ', draught);
          let clicked = { ...square };
          if (mode === AppConstants.PLACE_MODE) {
            clicked = {
              ...square,
              draught: { ...draught },
            };
          }
          this.store.dispatch(new Click(clicked));
        })
      )
      .take(1)
      .subscribe();
  }
}
