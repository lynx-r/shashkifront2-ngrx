import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Notation } from '../../models/notation';
import { NotationAtomStroke } from '../../models/notation-atom-stroke';
import { AppConstants } from '../../../core/services/app-constants';

@Component({
  selector: 'ac-notation',
  template: `
    <div [style.height.px]="rowHeight">
      <div>
        Ход {{ blackTurn ? 'Чёрных' : 'Белых' }}
      </div>
      <div class="notation">
        <div *ngFor="let stroke of notation.notationStrokes">
          <a (click)="loadBoard.emit(stroke.first?.boardId)" class="notation-link">
            {{stroke.count}}. {{formatStroke(stroke.first)}}
          </a>
          <a *ngIf="stroke.second" (click)="loadBoard.emit(stroke.second?.boardId)" class="notation-link">
            {{formatStroke(stroke.first)}}
          </a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./notation.component.css'],
})
export class NotationComponent {
  @Output() loadBoard = new EventEmitter<string>();
  @Input() blackTurn: boolean;
  @Input() notation: Notation;
  @Input() rowHeight: number;

  formatStroke(stroke: NotationAtomStroke) {
    return stroke.strokes.join(
      stroke.type === AppConstants.SIMPLE_STROKE ? '-' : ':'
    );
  }
}
