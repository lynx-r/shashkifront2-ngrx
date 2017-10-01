import { Component, Input } from '@angular/core';
import { Article } from '../models/article';

@Component({
  selector: 'bc-article-preview',
  template: `
      <md-card *ngIf="article">
        <md-card-title-group>
          <md-card-title>{{ article.title | acEllipsis:35 }}</md-card-title>
        </md-card-title-group>
        <md-card-content>
          <p>{{ article.content | acEllipsis }}</p>
          <a md-button [routerLink]="[article.id, 'view']">
            <md-icon>pageview</md-icon>
          </a>
          <a md-button [routerLink]="[article.id, 'edit']" *ngIf="loggedIn">
            <md-icon>edit</md-icon>
          </a>
        </md-card-content>
        <md-card-footer>
          <p>
            Автор: {{ article.author ? article.author : 'Новый автор' }}
          </p>
          <p>
            Опубликовано: {{ article.createdAt | date:'medium' }}
          </p>
        </md-card-footer>
      </md-card>
  `,
  styles: [
    `
      md-card {
        width: 400px;
        height: 300px;
        margin: 15px;
      }

      @media only screen and (max-width: 768px) {
        md-card {
          margin: 15px 0 !important;
        }
      }

      md-card:hover {
        box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
      }

      md-card-title {
        margin-right: 10px;
      }

      md-card-title-group {
        margin: 0;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      img {
        width: 60px;
        min-width: 60px;
        margin-left: 5px;
      }

      md-card-content {
        margin-top: 15px;
        margin: 15px 0 0;
      }

      span {
        display: inline-block;
        font-size: 13px;
      }

      md-card-footer {
        padding: 0 25px 25px;
      }
    `,
  ],
})
export class ArticlePreviewComponent {
  @Input() article: Article;
  @Input() loggedIn: boolean;
}
