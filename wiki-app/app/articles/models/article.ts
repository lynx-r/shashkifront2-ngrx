export interface Article {
  id: string;
  title: string;
  content: string;
  createdAt?: Date;
  author: string;
  boardId: string;
}
