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

@Component({
  selector: 'ac-create-article-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ac-editor></ac-editor>
  `,
})
export class CreateArticlePageComponent implements OnDestroy {
  @Input() edit: boolean = false;

  actionsSubscription: Subscription;

  constructor(store: Store<fromArticles.State>, route: ActivatedRoute) {
    //   this.actionsSubscription = route.params
    //     .map(params => {
    //       let initArticle: Article = {
    //         id: '',
    //         title: 'Новая статья',
    //         content: 'Содержание статьи',
    //         boardId: null,
    //         author: '',
    //       };
    //       return this.edit
    //         ? new article.Edit(params.id)
    //         : new article.Create(initArticle);
    //     })
    //     .subscribe(store);
  }

  ngOnDestroy() {
    // this.actionsSubscription.unsubscribe();
  }
}
