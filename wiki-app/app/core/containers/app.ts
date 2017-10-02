import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromAuth from '../../auth/reducers';
import * as layout from '../actions/layout';

@Component({
  selector: 'ac-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <block-ui>
      <ac-layout>
        <!--<ac-sidenav [open]="showSidenav$ | async">-->
          <!--<ac-nav-item (navigate)="closeSidenav()" routerLink="/articles/create"-->
                       <!--icon="article"-->
                       <!--hint="Написать статью">-->
            <!--Новая статья-->
          <!--</ac-nav-item>-->
          <!--<ac-nav-item (navigate)="closeSidenav()" routerLink="/articles" hint="Все статьи сайта" icon="">-->
            <!--Статьи-->
          <!--</ac-nav-item>-->
        <!--</ac-sidenav>-->
        <ac-toolbar (openMenu)="openSidenav()">
        </ac-toolbar>

        <router-outlet></router-outlet>
      </ac-layout>
    </block-ui>
  `,
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new layout.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenav());
  }
}
