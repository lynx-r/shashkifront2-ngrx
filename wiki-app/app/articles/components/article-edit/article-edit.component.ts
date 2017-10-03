import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { Store } from '@ngrx/store';
import * as fromArticles from '../../reducers';
import * as toolbar from '../../actions/toolbar';
import { BoardBox } from '../../models/board-box';

@Component({
  selector: 'bc-article-edit',
  templateUrl: './article-edit.component.html',
  styles: [],
})
export class ArticleEditComponent implements OnInit {
  @Input() article: Article;
  @Input() boardBox: BoardBox;

  constructor(private store: Store<fromArticles.State>) {}

  ngOnInit() {
    this.article = { ...this.article };
    this.boardBox = { ...this.boardBox };
  }

  handleArticleChanges() {
    if (!!this.article) {
      this.store.dispatch(new toolbar.SaveArticle({ ...this.article }));
    }
  }

  handleBoardBoxChanges() {
    if (!!this.boardBox) {
      this.store.dispatch(new toolbar.SaveBoardBox({ ...this.boardBox }));
    }
  }
}
