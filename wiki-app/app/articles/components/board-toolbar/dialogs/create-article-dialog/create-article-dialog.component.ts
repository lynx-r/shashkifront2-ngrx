import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Rules } from '../../../../models/rules';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { CreateArticleRequest } from '../../../../models/create-article-request';

@Component({
  selector: 'create-article-dialog',
  templateUrl: './create-article-dialog.component.html',
  styleUrls: ['./create-article-dialog.component.css'],
})
export class CreateArticleDialogComponent {
  Rules: Rules = Rules;

  constructor(
    public dialogRef: MdDialogRef<CreateArticleDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: CreateArticleRequest
  ) {}
}
