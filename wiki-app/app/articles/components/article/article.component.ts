import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';

@Component({
  selector: 'board-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article: Article;

  constructor() {}

  ngOnInit() {}
}
