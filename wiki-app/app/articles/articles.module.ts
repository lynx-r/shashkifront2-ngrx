import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from './components';
import { reducers } from './reducers';
import { EditArticlePageComponent } from './containers/edit-article-page';
import { ArticleEffects } from './effects/article';
import { ArticleService } from '../core/services/article.service';
import { ApiArticleService } from '../core/services/api-article.service';
import { CollectionPageComponent } from './containers/collection-page';
import { CollectionEffects } from './effects/collection';
import { BoardEffects } from './effects/board';
import { BoardService } from '../core/services/board.service';
import { ApiBoardService } from '../core/services/api-board.service';
import { ArticleExistsGuard } from './guards/article-exists';
import { DialogService } from './services/dialog.service';
import { ToolbarEffects } from './effects/toolbar';
import { AuthGuard } from '../auth/services/auth-guard.service';
import { ViewArticlePageComponent } from './containers/view-article-page';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: 'create',
        component: EditArticlePageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        children: [
          {
            path: 'edit',
            component: EditArticlePageComponent,
            canActivate: [AuthGuard],
          },
          { path: 'view', component: ViewArticlePageComponent },
        ],
        canActivate: [ArticleExistsGuard],
      },
      {
        path: '',
        component: CollectionPageComponent,
      },
    ]),

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('articles', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([
      ArticleEffects,
      BoardEffects,
      CollectionEffects,
      ToolbarEffects,
    ]),
  ],
  declarations: [
    EditArticlePageComponent,
    ViewArticlePageComponent,
    // FindArticlePageComponent,
    // ViewArticlePageComponent,
    // SelectedArticlePageComponent,
    CollectionPageComponent,
  ],
  providers: [
    ArticleExistsGuard,
    ArticleService,
    ApiArticleService,
    BoardService,
    ApiBoardService,
    DialogService,
  ],
})
export class ArticlesModule {}
