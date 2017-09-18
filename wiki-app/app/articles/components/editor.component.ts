import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-editor',
  template: `
    <div class="row">
      <ac-board-toolbar class="col-12"></ac-board-toolbar>
    </div>
    <div class="row" *ngIf="article; else createArticle">
      <div class="col-6">
        <board></board>
      </div>
      <div class="col-6">
        <board-article></board-article>
      </div>
    </div>
    <ng-template #createArticle>
      <div>
        Нажмите <i class="fa fa-file"></i> для того, чтобы создать новую статью или
        <i class="fa fa-folder-open"></i>, чтобы открыть существующую.
      </div>
    </ng-template>
  `,
  styles: [],
})
export class EditorComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
