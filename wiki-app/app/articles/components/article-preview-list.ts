import { Component, Input } from '@angular/core';
import { Article } from '../models/article';

@Component({
  selector: 'ac-article-preview-list',
  template: `
    <bc-article-preview *ngFor="let article of articles" [article]="article"></bc-article-preview>
  `,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
  ],
})
export class ArticlePreviewListComponent {
  @Input() articles: Article[];

  constructor() {
    console.log('ARTICLES', this.articles);
  }
}
