import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromArticles from '../reducers';
import * as collection from '../actions/article-collection';
import * as fromAuth from '../../auth/reducers';
import { Article } from '../models/article';
import { AppConstants } from '../../core/services/app-constants';

@Component({
  selector: 'ac-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Статьи</md-card-title>
    </md-card>

    <ac-article-preview-list [loggedIn]="loggedIn$ | async" [articles]="article$ | async"></ac-article-preview-list>
  `,
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   */
  styles: [
    `
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `,
  ],
})
export class CollectionPageComponent implements OnInit {
  article$: Observable<Article[]>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromArticles.State>) {
    this.article$ = store.select(fromArticles.getArticleCollection);
    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load(AppConstants.ARTICLE_PAGE_SIZE));
  }
}
