import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Rules } from '../../../../models/rules';

@Component({
  selector: 'create-article-dialog',
  templateUrl: './create-article-dialog.component.html',
  styleUrls: ['./create-article-dialog.component.css'],
})
export class CreateArticleDialogComponent implements OnInit {
  @Input() fillBoard: boolean = true;
  @Input() title: string = 'My Article';
  @Input() black: boolean = false;
  @Input() rules: Rules = Rules.RUSSIAN;
  Rules: Rules = Rules;

  constructor() // public bsModalRef: BsModalRef
  {
  }

  ngOnInit() {
    console.log('dsf');
  }

  onNewArticle() {
    let articleConfig = {
      title: this.title,
    };
    let boardConfig = {
      fillBoard: this.fillBoard,
      black: this.black,
      rules: Rules.serialize(this.rules),
      squareSize: this.getSquareSize(),
    };
    console.log(boardConfig);
    let params = { article: articleConfig, board: boardConfig };
    // this.bsModalRef.hide();
  }

  getSquareSize(): number {
    return 60;
  }
}
