import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import 'rxjs/Rx';
import * as fromArticles from '../../reducers';
import * as board from '../../actions/board';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ac-board-toolbar',
  templateUrl: './board-toolbar.component.html',
  styleUrls: ['./board-toolbar.component.css'],
})
export class BoardToolbarComponent implements OnInit {
  @Output() createArticle = new EventEmitter();

  color: string;

  constructor() {}

  ngOnInit() {}
}
