import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../../models/board';
import { BoardService } from '../../service/board.service';
import { Utils } from '../../service/utils.service';
import 'rxjs/add/observable/of';
import { LocalStorageService } from 'ngx-webstorage';
import { ArticleService } from '../../service/article.service';
import { Rules } from '../../models/rules';
import { Square } from '../../models/square';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  boardDimension: Array<number>;
  boardChunk: Array<number>;
  board: Board;
  squares: Square[];

  constructor(
    private articleService: ArticleService,
    private boardService: BoardService
  ) {}

  ngOnInit() {
    this.articleService.articleObservable().subscribe(article => {
      if (article.board) {
        this.updateBoard(article.board);
      }
    });
    if (this.articleService.article.board) {
      this.boardService
        .findById(this.articleService.article.board.id)
        .then(board => {
          this.updateBoard(board);
        })
        .catch(() => {});
    }
  }

  private updateBoard(board) {
    if (board) {
      this.boardDimension = Rules.getBoardLenth(board.rules);
      this.boardChunk = Rules.getChunk(
        this.boardDimension,
        Math.abs(Rules.getDimension(board.rules))
      );
      this.board = board;
      if (this.board.currentBoard) {
        this.squares = this.board.currentBoard.squares;
      } else {
        this.squares = [];
      }
    }
  }
}
