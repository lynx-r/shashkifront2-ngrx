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

      <button md-button [routerLink]="['articles']" routerLinkActive="active" title="Все статьи">
        Статьи
      </button>
      <div class="fill-remaining-space"></div>
      <button md-button [routerLink]="['mission']" routerLinkActive="active" title="Миссия">
        Миссия
      </button>
      <button md-button [routerLink]="['about']" routerLinkActive="active" title="О сайте">
        О сайте
      </button>
    </md-toolbar>
  `,
  styles: [
    `
      .fill-remaining-space {
        flex: 1 1 auto;
      }

      .active {
        color: #fff59f;
      }
    `,
  ],
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
