import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Article } from '../models/article';
import { BoardBox } from '../models/board-box';
import { MdGridTile } from '@angular/material';
import { Square } from '../models/square';
import { Utils } from '../../core/services/utils.service';
import { AppConstants } from '../../core/services/app-constants';
import { Draught } from '../models/draught';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'ac-editor',
  templateUrl: './editor.component.html',
  styles: [],
})
export class EditorComponent implements OnInit, OnChanges {
  @Input() article: Article;
  @Input() boardBox: BoardBox;
  @Output() squareClicked = new EventEmitter<Square>();
  @Output() openCreateArticleDialog = new EventEmitter();
  @Output() editToggled = new EventEmitter();
  @Output() undo = new EventEmitter();
  @Output() redo = new EventEmitter();

  notationPrevious$ = new BehaviorSubject<string[]>([]);
  notationNext$ = new BehaviorSubject<string[]>([]);
  currentStroke: string;

  rowHeight: number;
  backgroundColor: string;
  draught: Draught;

  @ViewChild('boardTile') boardTileRef: MdGridTile;
  private mode: string;
  private deleteMode: boolean;

  constructor() {
    this.draught = {
      v: 0,
      h: 1,
      black: false,
      highlighted: false,
      beaten: false,
      queen: false,
    };
  }

  ngOnInit() {
    this.rowHeight = window.innerHeight;
    this.mode = AppConstants.WRITE_MODE;
    this.backgroundColor = Utils.getModeColor(this.mode);
    this.deleteMode = false;
  }

  ngOnChanges() {
    if (!!this.boardBox) {
      let board = this.boardBox.board;
      this.notationPrevious$.next(
        Utils.getNotation(this.boardBox.board.previousBoards)
      );
      this.notationNext$.next(
        Utils.getNotation(this.boardBox.board.nextBoards)
      );
      if (board.selectedSquare) {
        this.currentStroke = board.selectedSquare.notation;
      } else {
        this.currentStroke = '';
      }
    }
  }

  // private fillNotation(notations: string[], board: Board) {
  //   if (!notations)
  //     return;
  //   notations.splice(0, notations.length);
  //   console.log('splice',notations);
  //   notations.concat(Utils.getNotation(board.previousBoards));
  // }

  toggleMode(mode: string) {
    this.editToggled.emit(mode);
    this.mode = mode;
    this.backgroundColor = Utils.getModeColor(mode);
  }

  toggleDelete(action: string) {
    this.deleteMode = action == 'delete';
  }

  toggleColor(color: string) {
    this.draught = {
      ...this.draught,
      black: color == 'black',
    };
  }

  toggleType(type: string) {
    this.draught = {
      ...this.draught,
      queen: type == 'queen',
    };
  }

  onSquareClicked(square: Square) {
    console.log('CLICKED', square);
    if (this.mode == AppConstants.WRITE_MODE) {
      this.squareClicked.emit(square);
    } else {
      let squareDraught = {
        ...square,
        draught: {
          ...this.draught,
          beaten: this.deleteMode,
        },
      };
      this.squareClicked.emit(squareDraught);
    }
  }
}
