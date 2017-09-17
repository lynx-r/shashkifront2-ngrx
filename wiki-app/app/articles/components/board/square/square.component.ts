import { Component, Input, OnInit } from '@angular/core';
import { Square } from '../../../models/square';
import { Article } from '../../../models/article';
import { Move } from '../../../models/move';

@Component({
  selector: 'square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css'],
})
export class SquareComponent implements OnInit {
  @Input() square: Square;
  draughtTop: string;
  draughtLeft: string;
  black: boolean;
  removeDraught: boolean;
  editMode: boolean;
  article: Article;
  // private removeDraught: boolean;
  // private editMode: boolean;

  constructor() {}

  ngOnInit() {
    if (this.square) {
      this.black = this.square.main;
      // берем 10% от размера клетки
      this.draughtTop = this.draughtLeft = `${this.square.size / 10}px`;
    }
  }

  onSquareClicked() {
    // if (this.editMode) {
    //   if (this.removeDraught) {
    //     this.boardService.removeDraught({
    //       _articleId: this.content.id,
    //       x: this.square.h,
    //       y: this.square.v,
    //     });
    //   } else {
    //     this.boardService.addDraught({
    //       _articleId: this.content.id,
    //       x: this.square.h,
    //       y: this.square.v,
    //       black: this.boardService.selectedDraughtDescFlag.black,
    //       queen: this.boardService.selectedDraughtDescFlag.queen,
    //     });
    //   }
    // } else {
    //   let move: Move = <Move>{ undoMove: false, targetSquare: this.square };
    //   this.boardService.moveToSquareEvent.emit(move);
    // }
  }
}
