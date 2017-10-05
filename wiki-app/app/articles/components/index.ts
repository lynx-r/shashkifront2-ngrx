import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../../shared/pipes';
import { EditorComponent } from './editor/editor.component';
import { BoardToolbarComponent } from './board-toolbar/board-toolbar.component';
import { DraughtEditComponent } from './board-toolbar/draught-edit/draught-edit.component';
import { OpenArticleDialogComponent } from './board-toolbar/dialogs/open-article-dialog/open-article-dialog.component';
import { CreateArticleDialogComponent } from './board-toolbar/dialogs/create-article-dialog/create-article-dialog.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './board/square/square.component';
import { DraughtComponent } from './board/draught/draught.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { ArticlePreviewListComponent } from './article-preview-list';
import { ArticlePreviewComponent } from './article-preview';
import { NotationComponent } from './notation/notation.component';
import { MaterialModule } from '../../material.module';
import { PlaceDraughtRowComponent } from './board-toolbar/row/place-draught-row.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { NotationStrokeComponent } from './notation/notation-stroke.component';
import { NotationMenuComponent } from './notation/notation-alternative-menu.component';
import { DateAdapter, MD_DATE_FORMATS } from '@angular/material';
import { MyDateAdapter } from '../../my-date-adapter';
import { AppConstants } from '../../core/services/app-constants';

export const COMPONENTS = [
  EditorComponent,
  BoardToolbarComponent,
  DraughtEditComponent,
  OpenArticleDialogComponent,
  CreateArticleDialogComponent,
  BoardComponent,
  NotationComponent,
  NotationStrokeComponent,
  NotationMenuComponent,
  SquareComponent,
  DraughtComponent,
  ArticleViewComponent,
  ArticleEditComponent,
  ArticlePreviewListComponent,
  ArticlePreviewComponent,
  PlaceDraughtRowComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: [CreateArticleDialogComponent],
})
export class ComponentsModule {}
