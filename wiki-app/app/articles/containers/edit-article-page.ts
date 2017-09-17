import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import * as fromArticles from '../reducers';
import * as article from '../actions/article';

@Component({
  selector: 'ec-edit-article-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ec-edit-article-page>
      <ac-create-article-page [edit]="true"></ac-create-article-page>
    </ec-edit-article-page>
  `,
})
export class EditArticlePageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromArticles.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .map(params => new article.Edit(params.id))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
