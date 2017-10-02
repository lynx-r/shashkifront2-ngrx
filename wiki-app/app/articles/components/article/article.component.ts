import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Article } from '../../models/article';
import { Store } from '@ngrx/store';
import * as fromArticles from '../../reducers';
import * as articleAction from '../../actions/article';
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
    console.log('NG INIT ARTICLE', this.currentArticle);
  }

  handleChanges() {
    if (!!this.currentArticle) {
      let article = _.merge({}, this.currentArticle);
      console.log('changes ', article);
      this.store.dispatch(new articleAction.Load(article));
    }
  }
}
