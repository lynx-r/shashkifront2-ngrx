import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from './components';
import { EditArticlePageComponent } from './containers/edit-article-page';
import { reducers } from './reducers';
import { CreateArticlePageComponent } from './containers/create-article-page';
import { ArticleEffects } from './effects/article';
import { ArticleService } from '../core/services/article.service';
import { ApiArticleService } from '../core/services/api-article.service';
import { CollectionPageComponent } from './containers/collection-page';
import { CollectionEffects } from './effects/collection';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild([
      // { path: 'find', component: FindArticlePageComponent },
      { path: 'create', component: CreateArticlePageComponent },
      // {
      //   path: ':id',
      //   component: EditArticlePageComponent,
      //   canActivate: [ArticleExistsGuard],
      // },
      { path: '', component: CollectionPageComponent },
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
    EffectsModule.forFeature([ArticleEffects, CollectionEffects]),
  ],
  declarations: [
    CreateArticlePageComponent,
    EditArticlePageComponent,
    // FindArticlePageComponent,
    // ViewArticlePageComponent,
    // SelectedArticlePageComponent,
    CollectionPageComponent,
  ],
  providers: [ArticleService, ApiArticleService],
})
export class ArticlesModule {}
