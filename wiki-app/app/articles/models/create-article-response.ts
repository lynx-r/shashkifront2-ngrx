import { Article } from './article';
import { CreateBoardRequest } from './create-board-request';
import { BoardBox } from './board-box';

export class CreateArticleResponse {
  article: Article;
  board: BoardBox;
}
