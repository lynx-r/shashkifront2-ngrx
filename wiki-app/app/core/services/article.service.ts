import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from './app-constants';
import { ApiArticleService } from './api-article.service';
import { Article } from '../../articles/models/article';
import { CreateArticleRequest } from '../../articles/models/create-article-request';
import { CreateArticleResponse } from '../../articles/models/create-article-response';

@Injectable()
export class ArticleService {
  constructor(private apiArticleService: ApiArticleService) {}

  createArticle(
    article: CreateArticleRequest
  ): Observable<CreateArticleResponse> {
    return this.apiArticleService.post(AppConstants.ARTICLE_RESOURCE, article);
  }

  // refreshArticle(content, unblock) {
  //   this.localStorage.clear(AppConstants.ARTICLE_STORAGE_KEY);
  //   if (content) {
  //       // this.localStorage.store(AppConstants.BOARD_STORAGE_KEY, ac-board);
  //       this.localStorage.store(AppConstants.ARTICLE_STORAGE_KEY, content);
  //       unblock();
  //   }
  // }

  listArticles(limit: number = 20): Observable<Article[]> {
    return this.apiArticleService.get(
      AppConstants.ARTICLES_RESOURCE + `?limit=${limit}`
    );
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
  //       .get(AppConstants.ARTICLES_RESOURCE + `/${articleId}`)
  //       .subscribe((content) => {
  //         this.refreshArticle(content, unblock);
  //       });
  //   })
  // }

  // updateArticle() {
  //   Utils.blockUI(this.blockUIService,(unblock) => {
  //     this.apiArticleService
  //       .put(AppConstants.ARTICLES_RESOURCE, {content: this.content})
  //       .subscribe((content) => {
  //         this.refreshArticle(content, unblock);
  //       })
  //   })
  // }

  fillInBoard() {
    // this.blockUI((unblock) => {
    // this.apiArticleService.post(AppConstants.ARTICLES_RESOURCE, {id: this.content.id}, (resp) => {
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
    // this.socketService.socket.emit(AppConstants.CLEAR_BOARD, {id: this.content.id}, (resp) => {
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
    // this.socketService.socket.emit(AppConstants.REMOVE_ARTICLE, {id: this.content.id}, (resp) => {
    //   if (resp.ok) {
    //     this.refreshArticle(null);
    //   } else {
    //     Utils.handleError(resp.data);
    //   }
    //   unblock();
    // })
    // })
  }

  // get ac-board() {
  //   return this.content.ac-board;
  // }
  findArticleById(articleId: string): Observable<Article> {
    return this.apiArticleService.get(
      AppConstants.ARTICLE_RESOURCE + `/${articleId}`
    );
  }

  saveArticle(saving: Article): Observable<Article> {
    return this.apiArticleService.put(AppConstants.ARTICLE_RESOURCE, saving);
  }
}
