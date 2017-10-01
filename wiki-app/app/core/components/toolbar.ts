import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Auth from '../../auth/actions/auth';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'ac-toolbar',
  template: `
    <md-toolbar color="primary">
      <button md-icon-button (click)="openMenu.emit()">
        <md-icon>menu</md-icon>
      </button>
      <ng-content></ng-content>

      <button md-button [routerLink]="['articles']" title="Все статьи">
        Статьи
      </button>

      <span class="fill-space"></span>
      
      <button md-button *ngIf="!(loggedIn$ | async)" [routerLink]="['login']">
        Войти
      </button>
      <button md-button  (activate)="logout()" *ngIf="loggedIn$ | async">
        Выйти
      </button>
    </md-toolbar>
  `,
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();

  constructor(private store: Store<fromRoot.State>) {}

  logout() {
    this.store.dispatch(new Auth.Logout());
  }
}
