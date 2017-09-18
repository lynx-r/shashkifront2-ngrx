import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../models/article';

@Component({
  selector: 'ac-editor',
  template: `
    <ac-board-toolbar class="col-12"></ac-board-toolbar>
    <md-grid-list *ngIf="article; else createArticle" cols="2">
      <md-grid-tile>
        <board></board>
      </md-grid-tile>
      <md-grid-tile>
        <board-article></board-article>
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

  constructor() {
    console.log(this.article);
  }

  ngOnInit() {}
}
