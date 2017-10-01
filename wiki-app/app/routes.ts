import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers/not-found-page';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  {
    path: 'index',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'articles',
    loadChildren: './articles/articles.module#ArticlesModule',
    // canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];
