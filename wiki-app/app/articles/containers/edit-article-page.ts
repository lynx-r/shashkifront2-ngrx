import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import * as fromArticles from '../reducers';
import * as article from '../actions/article';
import { Article } from '../models/article';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ac-create-article-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ac-editor [article]="article$ | async"></ac-editor>
  `,
})
export class EditArticlePageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  article$: Observable<Article>;

  constructor(store: Store<fromArticles.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .map(params => new article.Load(params.id))
      .subscribe(store);

    this.article$ = store.select(fromArticles.getSelectedArticle);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
