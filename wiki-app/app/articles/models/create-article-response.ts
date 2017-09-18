import { Article } from './article';
import { CreateBoardRequest } from './create-board-request';
import { Board } from './board';

export class CreateArticleResponse {
  article: Article;
  board: Board;
}
