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
import { MdGridList, MdGridTile } from '@angular/material';
import { Square } from '../../models/square';
import { Utils } from '../../../core/services/utils.service';
import { AppConstants } from '../../../core/services/app-constants';
import { Draught } from '../../models/draught';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CookieService } from 'ngx-cookie';
import { Store } from '@ngrx/store';
import * as fromArticles from '../../reducers';
import {
  getBoardMode,
  getSelectedBoard,
  getSelectedDraught,
} from '../../reducers/index';
import { Location } from '@angular/common';
import { NotationStroke } from '../../models/notation-stroke';
import { Notation } from '../../models/notation';
import * as toolbar from '../../actions/toolbar';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ac-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  @Output() loadBoard = new EventEmitter<string>();

  @Input() edit: boolean;
  @Input() article: Article;
  @Input() boardBox: BoardBox;
  @Input() notation: Notation;

  rowHeight: number;

  mode: string;
  draught: Draught;

  cols: Observable<number>;

  constructor(
    private store: Store<fromArticles.State>,
    private location: Location,
    private observableMedia: ObservableMedia
  ) {}

  ngOnInit() {
    this.store.select(getBoardMode).subscribe(mode => (this.mode = mode));

    const grid = new Map([
      ['xs', 2],
      ['sm', 2],
      ['md', 12],
      ['lg', 12],
      ['xl', 12],
    ]);
    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
        this.setRowHeight(mqAlias);
      }
    });
    this.cols = this.observableMedia
      .asObservable()
      .map(change => {
        console.log(change);
        console.log(grid.get(change.mqAlias));
        this.setRowHeight(change.mqAlias);
        return grid.get(change.mqAlias);
      })
      .startWith(start);
  }

  private setRowHeight(mqAlias: string) {
    switch (mqAlias) {
      case 'xs':
      case 'sm':
        this.rowHeight = 240;
        break;
      default:
        this.rowHeight = window.innerHeight;
        break;
    }
  }

  handleBack() {
    this.location.back();
  }

  handleLoadBoard(boardId: string) {
    this.store
      .select(getSelectedBoard)
      .do((boardBox: BoardBox) => {
        let updated = {
          ...boardBox,
          boardId: boardId,
        };
        this.store.dispatch(new toolbar.LoadBoard(updated));
      })
      .take(1)
      .subscribe();
  }
}
