import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { Store } from '@ngrx/store';
import * as fromArticles from '../../reducers';
import * as articleAction from '../../actions/article';

@Component({
  selector: 'ac-board-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  currentArticle: Article;

  constructor(private store: Store<fromArticles.State>) {}

  ngOnInit() {
    this.currentArticle = { ...this.article };
    console.log('NG INIT ARTICLE', this.article);
  }

  handleChanges() {
    if (!!this.currentArticle) {
      console.log(this.currentArticle);
      this.store.dispatch(new articleAction.Load({ ...this.currentArticle }));
    }
  }
}
