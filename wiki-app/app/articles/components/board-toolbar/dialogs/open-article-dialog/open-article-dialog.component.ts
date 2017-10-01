import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../../models/article';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'open-article-dialog',
  templateUrl: './open-article-dialog.component.html',
  styleUrls: ['./open-article-dialog.component.css'],
})
export class OpenArticleDialogComponent implements OnInit {
  @Input() observableArticles: Observable<Article[]>;
  selectedArticle: Article;

  constructor() // private articleService: ArticleService,
  // private blockUIService: BlockUIService
  {
  }

  ngOnInit() {
    // this.articleService.articleObservable().subscribe(content => {
    //   this.selectedArticle = content;
    // });
    // this.selectedArticle = this.articleService.content;
  }

  onArticleSelected(article: Article) {
    this.selectedArticle = article;
  }

  onOpenArticle() {
    // this.articleService.openArticle(this.selectedArticle.id);
  }
}
