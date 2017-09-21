import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Article } from '../models/article';
import { Board } from '../models/board';
import { MdGridTile } from '@angular/material';
import { Square } from '../models/square';
import { Utils } from '../../core/services/utils.service';

@Component({
  selector: 'ac-editor',
  template: `
    <ac-board-toolbar></ac-board-toolbar>
    <md-grid-list [rowHeight]="rowHeight" #editorGrid *ngIf="article; else createArticle" cols="12">
      <md-grid-tile colspan="5">
        <ac-board #boardRef 
                  (squareClicked)="squareClicked.emit($event)" 
                  class="fit" 
                  [board]="board" 
                  [style.backgroundColor]="backgroundColor"
        ></ac-board>
      </md-grid-tile>
      <md-grid-tile colspan="1">
        Нотация
      </md-grid-tile>
      <md-grid-tile colspan="6">
        <ac-board-article class="fit" [article]="article"></ac-board-article>
      </md-grid-tile>
    </md-grid-list>
    <ng-template #createArticle>
      <div>
        Нажмите Создать, чтобы создать новую статью или
        Открыть, чтобы открыть существующую.
      </div>
    </ng-template>
  `,
  styles: [],
})
export class EditorComponent implements OnInit, OnChanges {
  @Input() article: Article;
  @Input() board: Board;
  @Input() mode: string;
  @Output() squareClicked = new EventEmitter<Square>();
  rowHeight: number;
  backgroundColor: string;

  @ViewChild('boardTile') boardTileRef: MdGridTile;

  constructor() {
    console.log('**BOARD**', this.board);
  }

  ngOnInit() {
    this.rowHeight = window.innerHeight;
  }

  ngOnChanges() {
    this.backgroundColor = Utils.getModeColor(this.mode);
    console.log('mode', this.backgroundColor);
  }
}
