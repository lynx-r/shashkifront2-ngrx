import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Article } from '../models/article';
import { Board } from '../models/board';
import { MdGridTile } from '@angular/material';

@Component({
  selector: 'ac-editor',
  template: `
    <ac-board-toolbar></ac-board-toolbar>
    <md-grid-list #editorGrid *ngIf="article; else createArticle" cols="2" class="full-width">
      <md-grid-tile style="background-color: aliceblue">
        <ac-board class="full-width" [board]="board"></ac-board>
      </md-grid-tile>
      <md-grid-tile style="background-color: aquamarine">
        <ac-board-article [article]="article"></ac-board-article>
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
export class EditorComponent implements OnInit {
  @Input() article: Article;
  @Input() board: Board;
  rowHeight: number;

  @ViewChild('boardTile') boardTileRef: MdGridTile;

  constructor() {
    console.log('**BOARD**', this.board);
  }

  ngOnInit() {}
}
