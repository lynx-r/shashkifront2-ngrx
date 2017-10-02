import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Square } from '../../../models/square';
import { Article } from '../../../models/article';
import { Move } from '../../../models/move';
import { Store } from '@ngrx/store';
import * as fromArticles from '../../../reducers';

@Component({
  selector: 'square',
  template: `
    <div class="fit">
      <div class="fit" [ngClass]="{'square-black': square != null, 'square-white': square == null, 'highlight': square?.highlighted}">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./square.component.css'],
})
export class SquareComponent {
  @Input() square: Square;
}
