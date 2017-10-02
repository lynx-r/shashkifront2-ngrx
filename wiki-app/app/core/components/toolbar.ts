import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Auth from '../../auth/actions/auth';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'ac-toolbar',
  template: `
    <md-toolbar color="primary">
      <!--<button md-icon-button (click)="openMenu.emit()">-->
        <!--<md-icon>menu</md-icon>-->
      <!--</button>-->
      <ng-content></ng-content>

      <button md-button [routerLink]="['articles']" title="Все статьи">
        Статьи
      </button>
      <button md-button [routerLink]="['articles', 'create']" title="Написать новую статью">
        Новая статья
      </button>
    </md-toolbar>
  `,
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
