import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotationAtomStroke } from '../../models/notation-atom-stroke';
import { AppConstants } from '../../../core/services/app-constants';
import { NotationStroke } from '../../models/notation-stroke';

@Component({
  selector: 'bc-notation-stroke',
  template: `
    <a (click)="loadBoard.emit(stroke.boardId)" class="notation-link" [ngClass]="{'cursor': stroke.cursor}">
      {{formatStroke(stroke)}}
    </a>
    <!--<bc-notation-menu (loadBoard)="loadBoard.emit($event)" [alternatives]="stroke.alternative"></bc-notation-menu>-->
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
export class NotationStrokeComponent {
  @Output() loadBoard = new EventEmitter<string>();
  @Input() stroke: NotationAtomStroke;

  formatStroke(stroke: NotationAtomStroke) {
    return stroke.strokes.join(
      stroke.type === AppConstants.SIMPLE_STROKE
        ? AppConstants.SIMPLE_STROKE_NOTATION
        : AppConstants.CAPTURE_STROKE_NOTATION
    );
  }
}
