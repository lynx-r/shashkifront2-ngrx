import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers/not-found-page';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  {
    path: 'about',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'articles',
    loadChildren: './articles/articles.module#ArticlesModule',
  },
  { path: '**', component: NotFoundPageComponent },
];
