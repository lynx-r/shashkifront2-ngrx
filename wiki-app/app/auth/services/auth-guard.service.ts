import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Auth from '../actions/auth';
import * as fromAuth from '../reducers';
import { CookieService } from 'ngx-cookie';
import { Utils } from '../../core/services/utils.service';
import { User } from '../models/user';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromAuth.State>,
    private cookieService: CookieService
  ) {}

  canActivate(): Observable<boolean> {
    return this.store
      .select(fromAuth.getLoggedIn)
      .take(1)
      .map(authed => {
        let cookie: boolean = Utils.stringToBoolean(
          this.cookieService.get('isLoggedIn')
        );
        if (!authed && !cookie) {
          this.store.dispatch(new Auth.LoginRedirect());
          return false;
        }

        let user = <User>{ name: 'User' };
        this.store.dispatch(new Auth.LoginSuccess({ user: user }));
        return true;
      });
  }
}
