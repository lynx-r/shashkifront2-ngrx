import { Board } from './board';
export interface Article {
  id: string;
  title: string;
  article: string;
  author: string;
  board: Board | null;
}
