import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Article } from '../../models/article';
import { BoardBox } from '../../models/board-box';
import { MdGridTile } from '@angular/material';
import { Square } from '../../models/square';
import { Utils } from '../../../core/services/utils.service';
import { AppConstants } from '../../../core/services/app-constants';
import { Draught } from '../../models/draught';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'ac-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
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
  draught: any;

  @ViewChild('boardTile') boardTileRef: MdGridTile;
  private mode: string;
  private deleteMode: boolean;

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.rowHeight = window.innerHeight;
    this.mode = this.cookieService.get(AppConstants.EDIT_MODE_COOKIE);
    if (!this.mode) {
      this.cookieService.put(
        AppConstants.EDIT_MODE_COOKIE,
        AppConstants.WRITE_MODE
      );
      this.mode = AppConstants.WRITE_MODE;
    }
    this.backgroundColor = Utils.getModeColor(this.mode);
    this.deleteMode = Utils.stringToBoolean(
      this.cookieService.get(AppConstants.DELETE_DRAUGHT_CHECKED_COOKIE)
    );
    if (!this.deleteMode) {
      this.cookieService.put(
        AppConstants.DELETE_DRAUGHT_CHECKED_COOKIE,
        'false'
      );
      this.deleteMode = false;
    }
    this.draught = this.cookieService.getObject(
      AppConstants.DRAUGHT_PLACE_COOKIE
    );
    if (!this.draught) {
      this.draught = {
        black: false,
        queen: false,
      };
      this.cookieService.putObject(
        AppConstants.DRAUGHT_PLACE_COOKIE,
        this.draught
      );
    }
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
    this.cookieService.put(AppConstants.EDIT_MODE_COOKIE, mode);
    this.backgroundColor = Utils.getModeColor(mode);
  }

  toggleDelete(action: string) {
    this.deleteMode = action == 'delete';
    this.cookieService.put(
      AppConstants.DELETE_DRAUGHT_CHECKED_COOKIE,
      `${this.deleteMode}`
    );
  }

  toggleColor(color: string) {
    this.draught = {
      ...this.draught,
      black: color == 'black',
    };
    this.cookieService.putObject(
      AppConstants.DRAUGHT_PLACE_COOKIE,
      this.draught
    );
  }

  toggleType(type: string) {
    this.draught = {
      ...this.draught,
      queen: type == 'queen',
    };
    this.cookieService.putObject(
      AppConstants.DRAUGHT_PLACE_COOKIE,
      this.draught
    );
  }

  selectDraught(mode: string) {
    if (mode == 'remove') {
      this.deleteMode = true;
      this.cookieService.put(
        AppConstants.DELETE_DRAUGHT_CHECKED_COOKIE,
        `${this.deleteMode}`
      );
    } else {
      this.deleteMode = false;
      this.cookieService.put(
        AppConstants.DELETE_DRAUGHT_CHECKED_COOKIE,
        `${this.deleteMode}`
      );

      let draughtMode = mode.split(',');
      console.log(mode, draughtMode);
      this.draught = {
        ...this.draught,
        queen: draughtMode[0] == 'queen',
        black: draughtMode[1] == 'black',
      };
      console.log(this.draught);
      this.cookieService.putObject(
        AppConstants.DRAUGHT_PLACE_COOKIE,
        this.draught
      );
    }
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

  onDraughtSelected() {}
}
