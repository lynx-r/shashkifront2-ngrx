import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Article } from '../../models/article';
import { Store } from '@ngrx/store';
import * as fromArticles from '../../reducers';
import * as toolbar from '../../actions/toolbar';
import { BoardBox } from '../../models/board-box';
import * as _ from 'lodash';
import { MdTabGroup } from '@angular/material';
import { CookieService } from 'ngx-cookie';
import { AppConstants } from '../../../core/services/app-constants';

@Component({
  selector: 'bc-article-edit',
  templateUrl: './article-edit.component.html',
  styles: [],
})
export class ArticleEditComponent implements OnInit {
  @Input() article: Article;
  @Input() boardBox: BoardBox;
  userArticle: Article;
  userBoardBox: BoardBox;
  eventDate: Date;

  selectedInfoTab: number;

  constructor(
    private store: Store<fromArticles.State>,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.userArticle = _.merge({}, this.article);
    this.userBoardBox = _.merge({}, this.boardBox);
    this.selectedInfoTab = +this.cookieService.get(
      AppConstants.ARTICLE_INFO_TAB_COOKIE
    );
    console.log('SELECT TAB', this.selectedInfoTab);
  }

  handleArticleChanges() {
    if (!!this.userArticle) {
      console.log('ARTICLE', this.userArticle);
      this.store.dispatch(
        new toolbar.SaveArticle(_.merge({}, this.userArticle))
      );
    }
  }

  handleBoardBoxChanges() {
    if (!!this.userBoardBox) {
      console.log(this.userBoardBox);
      this.store.dispatch(
        new toolbar.SaveBoardBox(_.merge({}, this.userBoardBox))
      );
    }
  }

  handleTabChange(event: any) {
    console.log(event);
    this.cookieService.put(AppConstants.ARTICLE_INFO_TAB_COOKIE, event);
  }

  handleDateChange(date: Date) {
    if (!!date) {
      this.userBoardBox.notation.date = date;
      this.handleBoardBoxChanges();
    }
  }
}
