import { Component } from '@angular/core';
import { OpenCreateArticleDialog } from '../actions/toolbar';
import { Square } from '../models/square';
import { BoardBox } from '../models/board-box';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Article } from '../models/article';
import { Draught } from '../models/draught';
import { Store } from '@ngrx/store';
import * as article from '../actions/article';
import * as board from '../actions/board';
import * as fromArticles from '../reducers';
import { ActivatedRoute } from '@angular/router';
import { Notation } from '../models/notation';

@Component({
  selector: 'bc-view-article-page-component',
  template: `
    <ac-editor [edit]="false"
               [article]="article$ | async"
               [boardBox]="boardBox$ | async"
               [notation]="notation$ | async"
    ></ac-editor>
  `,
  styles: [],
})
export class ViewArticlePageComponent {
  articleSubscription: Subscription;
  boardSubscription: Subscription;
  article$: Observable<Article>;
  boardBox$: Observable<BoardBox>;
  notation$: Observable<Notation>;

  constructor(
    private store: Store<fromArticles.State>,
    private route: ActivatedRoute
  ) {
    this.articleSubscription = route.params
      .map(params => new article.Select(params.id))
      .subscribe(store);
    this.boardSubscription = this.store
      .select(fromArticles.getSelectedArticle)
      .map(
        articleEntity =>
          !!articleEntity && new board.Select(articleEntity.boardBoxId)
      )
      .map(select => !!select && this.store.dispatch(select))
      .subscribe();

    this.article$ = this.store.select(fromArticles.getSelectedArticle);
    this.boardBox$ = this.store.select(fromArticles.getSelectedBoard);

    this.notation$ = this.store
      .select(fromArticles.getSelectedBoard)
      .map(boardBox => !!boardBox && boardBox.notation);
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
    this.boardSubscription.unsubscribe();
  }
}
