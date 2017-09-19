import { Component } from '@angular/core';
import 'rxjs/Rx';
import * as fromArticles from '../../reducers';
import * as article from '../../actions/article';
import * as createArticle from '../../actions/create-article';
import { MdDialog } from '@angular/material';
import { CreateArticleDialogComponent } from './dialogs/create-article-dialog/create-article-dialog.component';
import { CreateArticleRequest } from '../../models/create-article-request';
import { Rules } from '../../models/rules';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ac-board-toolbar',
  template: `
    <md-toolbar>
      <button md-raised-button (click)="openCreateArticleDialog()">
        Создать
      </button>
      <button md-raised-button (click)="findArticles()">
        Открыть
      </button>
    </md-toolbar>
  `,
  styleUrls: ['./board-toolbar.component.css'],
})
export class BoardToolbarComponent {
  private initialArticle: CreateArticleRequest;

  constructor(
    public dialog: MdDialog,
    private store: Store<fromArticles.State>
  ) {
    this.initialArticle = {
      article: {
        id: '',
        title: 'Новая статья',
        content: '',
        author: '',
        boardId: '',
      },
      boardRequest: {
        black: false,
        squareSize: 60,
        rules: Rules.RUSSIAN,
        fillBoard: false,
      },
    };
  }

  openCreateArticleDialog() {
    let openDialogHref = this.dialog.open(CreateArticleDialogComponent, {
      data: this.initialArticle,
      width: '400px',
    });
    openDialogHref.afterClosed().subscribe(result => {
      this.store.dispatch(new createArticle.Create(result));
    });
  }
}
