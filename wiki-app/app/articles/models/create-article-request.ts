import { Article } from './article';
import { CreateBoardRequest } from './create-board-request';

export class CreateArticleRequest {
  article: Article;
  boardRequest: CreateBoardRequest;
  type = 'ARTICLE_CREATE';
}
