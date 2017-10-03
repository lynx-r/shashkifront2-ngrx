import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/article';

@Component({
  selector: 'bc-article-view',
  templateUrl: './article-view.component.html',
  styles: [],
})
export class ArticleViewComponent {
  @Input() article: Article;
}
