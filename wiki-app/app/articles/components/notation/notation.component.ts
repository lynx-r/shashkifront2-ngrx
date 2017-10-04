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
        Ход <span class="white-turn" *ngIf="!blackTurn">Белых</span><span class="black-turn"
                                                                          *ngIf="blackTurn">Чёрных</span>
      </div>
      <div class="notation">
        <div *ngFor="let stroke of notation.notationStrokes" class="notation-stroke">
          <span>
            {{stroke.count}}. 
          </span>
          <a (click)="loadBoard.emit(stroke.first?.boardId)" class="notation-link" [ngClass]="{'cursor': stroke.first.cursor}">
            {{formatStroke(stroke.first)}}
          </a>
          <a *ngIf="stroke.second" (click)="loadBoard.emit(stroke.second?.boardId)" class="notation-link" [ngClass]="{'cursor': stroke.second.cursor}">
            {{formatStroke(stroke.second)}}
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
