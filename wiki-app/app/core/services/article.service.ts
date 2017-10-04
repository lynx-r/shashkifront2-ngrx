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

  listArticles(limit: number = 20): Observable<Article[]> {
    return this.apiArticleService.get(
      AppConstants.ARTICLES_RESOURCE + `?limit=${limit}`
    );
  }

  findArticleById(articleId: string): Observable<Article> {
    return this.apiArticleService.get(
      AppConstants.ARTICLE_RESOURCE + `/${articleId}`
    );
  }

  saveArticle(saving: Article) {
    return this.apiArticleService.put(AppConstants.ARTICLE_RESOURCE, saving);
  }
}
