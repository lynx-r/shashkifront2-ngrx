import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CreateArticleDialogComponent } from '../components/board-toolbar/dialogs/create-article-dialog/create-article-dialog.component';
import { Rules } from '../models/rules';
import { CreateArticleRequest } from '../models/create-article-request';
import { AppConstants } from '../../core/services/app-constants';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class DialogService {
  constructor(private dialog: MdDialog, private cookieService: CookieService) {}

  private getCreateArticleRequest(): CreateArticleRequest {
    let articleInit: any = this.cookieService.getObject(
      AppConstants.ARTICLE_CREATE_COOKIE
    );
    if (!articleInit) {
      articleInit = {
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
          rules: 'RUSSIAN',
          fillBoard: true,
        },
      };
      this.cookieService.putObject(
        AppConstants.ARTICLE_CREATE_COOKIE,
        articleInit
      );
    }
    return articleInit;
  }

  createArticle() {
    let dialogRef: MdDialogRef<CreateArticleDialogComponent>;

    let initArticle = this.getCreateArticleRequest();
    dialogRef = this.dialog.open(CreateArticleDialogComponent, {
      data: {
        ...initArticle,
        boardRequest: {
          ...initArticle.boardRequest,
        },
        article: {
          ...initArticle.article,
        },
      },
      width: '600px',
    });

    return dialogRef
      .afterClosed()
      .do(result =>
        this.cookieService.putObject(AppConstants.ARTICLE_CREATE_COOKIE, result)
      );
  }
}
