import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../../shared/pipes';
import { EditorComponent } from './editor.component';
import { BoardToolbarComponent } from './board-toolbar/board-toolbar.component';
import { DraughtEditComponent } from './board-toolbar/draught-edit/draught-edit.component';
import { OpenArticleDialogComponent } from './board-toolbar/dialogs/open-article-dialog/open-article-dialog.component';
import { CreateArticleDialogComponent } from './board-toolbar/dialogs/create-article-dialog/create-article-dialog.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './board/square/square.component';
import { DraughtComponent } from './board/draught/draught.component';
import { ArticleComponent } from './article/article.component';
import { ArticlePreviewListComponent } from './article-preview-list';
import { ArticlePreviewComponent } from './article-preview';
import { NotationComponent } from './notation/notation.component';

export const COMPONENTS = [
  EditorComponent,
  BoardToolbarComponent,
  DraughtEditComponent,
  OpenArticleDialogComponent,
  CreateArticleDialogComponent,
  BoardComponent,
  NotationComponent,
  SquareComponent,
  DraughtComponent,
  ArticleComponent,
  ArticlePreviewListComponent,
  ArticlePreviewComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
    FormsModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: [CreateArticleDialogComponent],
})
export class ComponentsModule {}
