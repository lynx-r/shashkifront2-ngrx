import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Draught } from '../../../models/draught';
import { Square } from '../../../models/square';
import { Article } from '../../../models/article';
import { Move } from '../../../models/move';
import { Subscription } from 'rxjs/Subscription';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'draught',
  template: `
    <div class="draught-container fit">
      <div #draughtRef
           [ngStyle]="{'color': draught?.black ? 'black' : 'white'}"
           [ngClass]="{
       'beaten' : draught?.beaten,
     'highlight': draught?.highlighted,
     'draught': !draught?.queen,
     'draught-queen': draught?.queen}"
      >
        <md-icon *ngIf="draught?.queen">spa</md-icon>
      </div>
    </div>
  `,
  styleUrls: ['./draught.component.css'],
})
export class DraughtComponent {
  @ViewChild('draughtRef') draughtRef: ElementRef;
  @Input() draught: Draught;
}
