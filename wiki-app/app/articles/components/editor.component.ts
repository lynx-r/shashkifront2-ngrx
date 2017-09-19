import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { Board } from '../models/board';

@Component({
  selector: 'ac-editor',
  template: `
    <ac-board-toolbar class="col-12"></ac-board-toolbar>
    <md-grid-list *ngIf="article; else createArticle" cols="2" class="full-width">
      <md-grid-tile style="background-color: aliceblue">
        <ac-board [board]="board"></ac-board>
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

  constructor() {
    console.log('AAA', this.article);
    console.log('BBB', this.board);
  }

  ngOnInit() {}
}
