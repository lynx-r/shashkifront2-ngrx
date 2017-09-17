import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Article } from '../../models/article';

@Component({
  selector: 'board-toolbar',
  templateUrl: './board-toolbar.component.html',
  styleUrls: ['./board-toolbar.component.css'],
})
export class BoardToolbarComponent implements OnInit {
  @ViewChild('selectColor') selectColor: ElementRef;
  @ViewChild('selectType') selectType: ElementRef;
  addBlack: boolean;
  addQueen: boolean;
  editMode: boolean;
  observableArticles: Observable<Article[]>;
  article: Article;
  removeDraught: boolean;

  selectedDraughtDesc: { black: boolean; queen: boolean };

  constructor() {}

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

  createArticleDialog() {
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
