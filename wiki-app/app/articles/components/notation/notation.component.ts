import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'ac-notation',
  template: `
    <span *ngFor="let stroke of notationPrevious">
      {{stroke}}
    </span>
    <span class="current-move">{{currentStroke}}</span>
    <span *ngFor="let stroke of notationNext">
      {{stroke}}
    </span>
  `,
  styles: [
    `
      .current-move {
        color: darkred;
      }
    `,
  ],
})
export class NotationComponent implements OnInit, OnChanges {
  @Input() notationPrevious: string[];
  @Input() notationNext: string[];
  @Input() currentStroke: string;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    console.log('1 ', this.notationPrevious);
  }
}
