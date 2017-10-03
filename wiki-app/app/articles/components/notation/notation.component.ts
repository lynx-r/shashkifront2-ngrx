import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'ac-notation',
  template: `
    <div>
      Ход {{ blackTurn ? 'Чёрных' : 'Белых' }}
    </div>
    <div>
      <div *ngFor="let n of notation">
        {{n}}
      </div>
    </div>
  `,
  styles: [],
})
export class NotationComponent {
  @Input() blackTurn: boolean;
  @Input() notation: string[];
}
