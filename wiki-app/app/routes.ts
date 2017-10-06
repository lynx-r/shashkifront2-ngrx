import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers/not-found-page';

export const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  {
    path: 'articles',
    loadChildren: './articles/articles.module#ArticlesModule',
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule',
  },
  { path: '**', component: NotFoundPageComponent },
];
