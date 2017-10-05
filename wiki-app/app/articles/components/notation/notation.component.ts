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
import { NotationStroke } from '../../models/notation-stroke';

@Component({
  selector: 'ac-notation',
  templateUrl: './notation.component.html',
  styleUrls: ['./notation.component.css'],
})
export class NotationComponent {
  @Output() loadBoard = new EventEmitter<string>();
  @Input() blackTurn: boolean;
  @Input() notation: NotationStroke[];
  @Input() rowHeight: number;
}
