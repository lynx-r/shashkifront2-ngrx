import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Article } from '../../models/article';
import { MdDialog } from '@angular/material';
import { CreateArticleDialogComponent } from './dialogs/create-article-dialog/create-article-dialog.component';
import { CreateArticleRequest } from '../../models/create-article-request';
import { Rules } from '../../models/rules';

@Component({
  selector: 'ac-board-toolbar',
  template: `
    <md-toolbar>
      <button md-raised-button (click)="openCreateArticleDialog()">
        Создать
      </button>
      <button md-raised-button (click)="findArticles()">
        Открыть
      </button>
    </md-toolbar>
  `,
  styleUrls: ['./board-toolbar.component.css'],
})
export class BoardToolbarComponent implements OnInit {
  @ViewChild('selectColor') selectColor: ElementRef;
  @ViewChild('selectType') selectType: ElementRef;

  @Output() createArticle = new EventEmitter<Article>();

  addBlack: boolean;
  addQueen: boolean;
  editMode: boolean;
  article: Article;
  removeDraught: boolean;
  private initialArticle: CreateArticleRequest;

  selectedDraughtDesc: { black: boolean; queen: boolean };

  constructor(public dialog: MdDialog) {
    this.initialArticle = {
      article: {
        id: '',
        title: 'Новая статья',
        content: '',
        author: '',
        boardId: null,
      },
      boardRequest: {
        black: false,
        squareSize: 60,
        rules: Rules.RUSSIAN,
        fillBoard: false,
      },
    };
  }

  ngOnInit() {}

  onDraughtSelected(black: boolean, queen: boolean) {
    this.addQueen = queen;
    this.addBlack = black;
    this.selectedDraughtDesc = { black: this.addBlack, queen: this.addQueen };
    this.removeDraught = false;
  }

  onRemoveDraught() {
    this.removeDraught = true;
  }

  onToggleEditMode() {
    this.editMode = !this.editMode;
  }

  findArticles() {}

  updateArticle() {}

  fillInitBoard() {}

  eraseBoard() {}

  removeArticle() {}

  openCreateArticleDialog() {
    let openDialogHref = this.dialog.open(CreateArticleDialogComponent, {
      data: {
        article: this.initialArticle,
      },
    });
    openDialogHref.afterClosed().subscribe(result => {
      this.article = result;
    });
    // let bsModalRef: BsModalRef = this.modalService.show(
    //   CreateArticleDialogComponent
    // );
  }

  undo() {
    console.log('hi');
  }

  redo() {
    console.log('hi');
  }
}
