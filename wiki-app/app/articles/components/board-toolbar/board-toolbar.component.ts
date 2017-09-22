import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import * as fromArticles from '../../reducers';
import * as article from '../../actions/article';
import * as board from '../../actions/board';
import * as createArticle from '../../actions/create-article';
import { MdDialog } from '@angular/material';
import { CreateArticleDialogComponent } from './dialogs/create-article-dialog/create-article-dialog.component';
import { CreateArticleRequest } from '../../models/create-article-request';
import { Rules } from '../../models/rules';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ac-board-toolbar',
  templateUrl: './board-toolbar.component.html',
  styleUrls: ['./board-toolbar.component.css'],
})
export class BoardToolbarComponent implements OnInit {
  private initialArticle: CreateArticleRequest;
  color: string;
  checkedMode$: Observable<string>;

  constructor(
    public dialog: MdDialog,
    private store: Store<fromArticles.State>
  ) {
    this.initialArticle = {
      article: {
        id: '',
        createdAt: new Date(),
        title: 'Новая статья',
        content: '',
        author: '',
        boardBoxId: '',
      },
      boardRequest: {
        black: false,
        rules: Rules.RUSSIAN,
        fillBoard: false,
      },
    };
  }

  ngOnInit() {
    this.checkedMode$ = this.store.select(fromArticles.getBoardMode);
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

  toggleEdit(mode: string) {
    this.store.dispatch(new board.Mode(mode));
  }
}
