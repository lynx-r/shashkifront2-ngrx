import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Rules } from '../../../../models/rules';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'create-article-dialog',
  template: `
    <h1 md-dialog-title>Создать статью</h1>
    <div md-dialog-content>
      <md-form-field>
        <input mdInput tabindex="1" [(ngModel)]="data.title" placeholder="Название статьи">
      </md-form-field>
      <div class="row">
        <label for="color" class="col-4">Цвет</label>
        <div class="col-8">
          <select id="color" [(ngModel)]="black" name="black" title="Цвет" class="form-control">
            <option [ngValue]="false" [selected]="true">Белые</option>
            <option [ngValue]="true">Черные</option>
          </select>
        </div>
      </div>
      <div class="row">
        <label for="rules" class="col-4">Правила</label>
        <div class="col-8">
          <select id="rules" [(ngModel)]="rules" name="rules" title="Правила" class="form-control">
            <option [ngValue]="Rules.RUSSIAN" [selected]="Rules.RUSSIAN">Русские шашки</option>
            <option [ngValue]="Rules.RUSSIAN_GIVEAWAY">Русские шашки (поддавки)</option>
            <option [ngValue]="Rules.INTERNATIONAL">Интернациональные шашки</option>
            <option [ngValue]="Rules.INTERNATIONAL_GIVEAWAY">Интернациональные шашки (поддавки)</option>
          </select>
        </div>
      </div>
      <div class="row">
        <label for="fillBoard" class="col-4">Расставить с начала</label>
        <div id="fillBoard" class="col-8">
          <input type="checkbox" [(ngModel)]="fillBoard" name="fillBoard" class="form-control">
        </div>
      </div>
    </div>
    <div md-dialog-actions>
      <button md-button md-dialog-close type="button" class="btn btn-secondary" data-dismiss="modal" (click)="bsModalRef.hide()">Отмена</button>
      <button md-button [md-dialog-close]="true" (click)="onNewArticle()" type="button" class="btn btn-primary" data-dismiss="modal">Создать</button>
    </div>
  `,
  styleUrls: ['./create-article-dialog.component.css'],
})
export class CreateArticleDialogComponent implements OnInit {
  @Input() fillBoard: boolean = true;
  @Input() title: string = 'My Article';
  @Input() black: boolean = false;
  @Input() rules: Rules = Rules.RUSSIAN;
  Rules: Rules = Rules;

  constructor(
    public dialogRef: MdDialogRef<CreateArticleDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log('dsf');
  }

  onNoClick(): void {
    this.dialogRef.close();
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
