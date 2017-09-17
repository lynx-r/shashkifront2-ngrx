import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Utils } from './utils.service';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from './app-constants';
import { Http } from '@angular/http';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { ApiArticleService } from './api-article.service';
import { BoardService } from './board.service';
import { Article } from '../../articles/models/article';

@Injectable()
export class ArticleService {
  constructor(private apiArticleService: ApiArticleService) {}

  createArticle(article: Article) {
    this.apiArticleService
      .post(AppConstants.ARTICLE_RESOURCE, article)
      .subscribe(articleAndBoard => {
        let article = articleAndBoard.article;
        article.board = articleAndBoard.board;
      });
  }

  // refreshArticle(article, unblock) {
  //   this.localStorage.clear(AppConstants.ARTICLE_STORAGE_KEY);
  //   if (article) {
  //       // this.localStorage.store(AppConstants.BOARD_STORAGE_KEY, board);
  //       this.localStorage.store(AppConstants.ARTICLE_STORAGE_KEY, article);
  //       unblock();
  //   }
  // }

  findArticles(): Observable<Article[]> {
    return this.apiArticleService.get(AppConstants.ARTICLE_RESOURCE);
  }

  // findArticlesIO(): Observable<Article[]> {
  // return new Observable((observer) => {
  // this.socketService.socket.emit(AppConstants.FIND_ARTICLES, {}, (resp) => {
  //   if (resp.ok) {
  //     observer.next(resp.data);
  //     observer.complete();
  //   } else {
  //     Utils.handleError(resp);
  //     observer.error(resp.comment);
  //   }
  // })
  // }).do(() => {
  //   this.blockUIService.stop(AppConstants.BLOCK_MAIN);
  // })
  // }

  // openArticle(articleId: string) {
  //   Utils.blockUI(this.blockUIService, (unblock) => {
  //     this.apiArticleService
  //       .get(AppConstants.ARTICLE_RESOURCE + `/${articleId}`)
  //       .subscribe((article) => {
  //         this.refreshArticle(article, unblock);
  //       });
  //   })
  // }

  // updateArticle() {
  //   Utils.blockUI(this.blockUIService,(unblock) => {
  //     this.apiArticleService
  //       .put(AppConstants.ARTICLE_RESOURCE, {article: this.article})
  //       .subscribe((article) => {
  //         this.refreshArticle(article, unblock);
  //       })
  //   })
  // }

  fillInBoard() {
    // this.blockUI((unblock) => {
    // this.apiArticleService.post(AppConstants.ARTICLE_RESOURCE, {id: this.article.id}, (resp) => {
    //   if (resp.ok) {
    //     this.refreshArticle(resp);
    //   } else {
    //     Utils.handleError(resp);
    //   }
    //   unblock();
    // })
    // })
  }

  eraseBoard() {
    // this.blockUI((unblock) => {
    // this.socketService.socket.emit(AppConstants.CLEAR_BOARD, {id: this.article.id}, (resp) => {
    //   if (resp.ok) {
    //     this.refreshArticle(resp);
    //   } else {
    //     Utils.handleError(resp.data);
    //   }
    //   unblock();
    // })
    // })
  }

  removeArticle() {
    // this.blockUI((unblock) => {
    // this.socketService.socket.emit(AppConstants.REMOVE_ARTICLE, {id: this.article.id}, (resp) => {
    //   if (resp.ok) {
    //     this.refreshArticle(null);
    //   } else {
    //     Utils.handleError(resp.data);
    //   }
    //   unblock();
    // })
    // })
  }

  // get board() {
  //   return this.article.board;
  // }
}
