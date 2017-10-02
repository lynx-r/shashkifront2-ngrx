import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { Store } from '@ngrx/store';
import * as fromArticles from '../../reducers';
import * as toolbar from '../../actions/toolbar';
import * as _ from 'lodash';

@Component({
  selector: 'ac-board-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  @Input() edit: boolean;
  @Input() article: Article;
  currentArticle: Article;

  constructor(private store: Store<fromArticles.State>) {}

  ngOnInit() {
    this.currentArticle = _.merge({}, this.article);
  }

  handleChanges() {
    if (!!this.currentArticle) {
      let article = _.merge({}, this.currentArticle);
      this.store.dispatch(new toolbar.SaveArticle(article));
    }
  }
}
