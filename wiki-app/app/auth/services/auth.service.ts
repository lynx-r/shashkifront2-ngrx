import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { User, Authenticate } from '../models/user';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthService {
  constructor(private cookieService: CookieService) {}

  login({ username, password }: Authenticate) {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    if (username !== 'test') {
      return _throw('Неверное имя или пароль');
    }

    this.cookieService.put('isLoggedIn', 'true');

    return of({ name: 'User' });
  }

  logout() {
    return of(true);
  }
}
