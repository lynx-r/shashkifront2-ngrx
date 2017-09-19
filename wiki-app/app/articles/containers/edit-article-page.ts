import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';
import * as fromArticles from '../reducers';
import * as article from '../actions/article';
import * as board from '../actions/board';
import { Article } from '../models/article';
import { Observable } from 'rxjs/Observable';
import { Board } from '../models/board';

@Component({
  selector: 'ac-create-article-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ac-editor [article]="article$ | async" [board]="board$ | async"></ac-editor>
  `,
})
export class EditArticlePageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  article$: Observable<Article>;
  board$: Observable<Board>;

  constructor(
    private store: Store<fromArticles.State>,
    private route: ActivatedRoute
  ) {
    this.actionsSubscription = route.params
      .map(params => new article.Select(params.id))
      .subscribe(store);

    this.article$ = this.store.select(fromArticles.getSelectedArticle);
    this.board$ = this.store.select(fromArticles.getSelectedBoard);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
