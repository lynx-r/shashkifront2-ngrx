import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CreateArticleDialogComponent } from '../components/board-toolbar/dialogs/create-article-dialog/create-article-dialog.component';
import { Rules } from '../models/rules';
import { CreateArticleRequest } from '../models/create-article-request';

@Injectable()
export class DialogService {
  private initialArticle: CreateArticleRequest;

  constructor(private dialog: MdDialog) {
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
        fillBoard: true,
      },
      test: true,
    };
  }

  createArticle() {
    let dialogRef: MdDialogRef<CreateArticleDialogComponent>;

    dialogRef = this.dialog.open(CreateArticleDialogComponent, {
      data: {
        ...this.initialArticle,
        boardRequest: {
          ...this.initialArticle.boardRequest,
        },
        article: {
          ...this.initialArticle.article,
        },
      },
      width: '40rem',
    });

    return dialogRef.afterClosed();
  }
}
