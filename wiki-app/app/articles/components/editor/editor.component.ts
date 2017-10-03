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
import { Location } from '@angular/common';

@Component({
  selector: 'ac-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  @Input() edit: boolean;
  @Input() article: Article;
  @Input() boardBox: BoardBox;
  @Input() notation: string[];

  rowHeight: number;

  mode: string;
  draught: Draught;

  constructor(
    private store: Store<fromArticles.State>,
    private location: Location
  ) {}

  ngOnInit() {
    this.rowHeight = window.innerHeight;
    this.store.select(getBoardMode).subscribe(mode => (this.mode = mode));
  }

  handleBack() {
    this.location.back();
  }
}
