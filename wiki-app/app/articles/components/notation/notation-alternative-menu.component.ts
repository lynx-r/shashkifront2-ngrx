import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotationAtomStroke } from '../../models/notation-atom-stroke';
import { AppConstants } from '../../../core/services/app-constants';
import { NotationStroke } from '../../models/notation-stroke';

@Component({
  selector: 'bc-notation-menu',
  template: `
    <span *ngIf="!!alternatives && alternatives.length != 0">
      <button md-icon-button [mdMenuTriggerFor]="alternativeMenu">
        <md-icon>keyboard_arrow_down</md-icon>
      </button>
      <md-menu #alternativeMenu="mdMenu">
        <a *ngFor="let alternative of alternatives">
          <bc-notation-stroke *ngIf="!!alternative.first" [stroke]="alternative.first"
                              (loadBoard)="loadBoard.emit($event)"></bc-notation-stroke>
        </a>
      </md-menu>
    </span>
  `,
  styles: [
    `
    .notation-link {
      text-decoration: underline;
      border-radius: 4px;
      margin-right: 8px;
    }

    .cursor {
      background-color: orange;
    }
  `,
  ],
})
export class NotationMenuComponent {
  @Output() loadBoard = new EventEmitter<string>();
  @Input() alternatives: NotationStroke[][];

  formatStroke(stroke: NotationAtomStroke) {
    return stroke.strokes.join(
      stroke.type === AppConstants.SIMPLE_STROKE
        ? AppConstants.SIMPLE_STROKE_NOTATION
        : AppConstants.CAPTURE_STROKE_NOTATION
    );
  }
}
