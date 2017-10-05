import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromAuth from '../../auth/reducers';
import * as layout from '../actions/layout';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subscription } from 'rxjs/Subscription';
import { AppConstants } from '../services/app-constants';

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
export class AppComponent implements OnInit, OnDestroy {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  private navigationEnd$: Observable<any>;
  @BlockUI() blockUI: NgBlockUI;
  private navigationStart$: Subscription;
  private navigationEndSubscription$: Subscription;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
  }

  ngOnInit() {
    this.navigationEnd$ = this.router.events.filter(
      event =>
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
    );

    this.navigationStart$ = this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe(_ => {
        Observable.timer(160)
          .takeUntil(this.navigationEnd$)
          .subscribe(_ =>
            this.blockUI.start(AppConstants.PAGE_LOADING_MESSAGE)
          );
      });

    this.navigationEndSubscription$ = this.navigationEnd$.subscribe(_ =>
      this.blockUI.stop()
    );
  }

  ngOnDestroy() {
    this.navigationStart$.unsubscribe();
    this.navigationEndSubscription$.unsubscribe();
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
