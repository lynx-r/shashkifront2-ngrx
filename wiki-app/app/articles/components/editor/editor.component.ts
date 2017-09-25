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
import { Store } from '@ngrx/store';
import * as fromArticles from '../../reducers';
import { getBoardMode, getSelectedDraught } from '../../reducers/index';

@Component({
  selector: 'ac-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit, OnChanges {
  @Input() article: Article;
  @Input() boardBox: BoardBox;

  notationPrevious$ = new BehaviorSubject<string[]>([]);
  notationNext$ = new BehaviorSubject<string[]>([]);
  currentStroke: string;

  rowHeight: number;

  mode: string;
  draught: Draught;

  constructor(private store: Store<fromArticles.State>) {}

  ngOnInit() {
    this.rowHeight = window.innerHeight;
    this.store.select(getBoardMode).subscribe(mode => (this.mode = mode));
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
}
