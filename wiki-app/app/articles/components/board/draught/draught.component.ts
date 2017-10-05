import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Draught } from '../../../models/draught';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'draught',
  template: `
    <div class="draught-container fit">
      <div #draughtRef
           [ngStyle]="{'color': draught?.black ? 'black' : 'white'}"
           [ngClass]="{
        'draught-mobile': (mobile | async),
        'captured' : draught?.captured,
        'highlight': draught?.highlighted,
        'draught': !draught?.queen,
        'draught-queen': draught?.queen 
      }"
      >
        <md-icon *ngIf="draught?.queen">spa</md-icon>
      </div>
    </div>
  `,
  styleUrls: ['./draught.component.css'],
})
export class DraughtComponent implements OnInit {
  @ViewChild('draughtRef') draughtRef: ElementRef;
  @Input() draught: Draught;

  mobile: Observable<boolean>;

  constructor(private observableMedia: ObservableMedia) {}

  ngOnInit() {
    const grid = new Map([
      ['xs', true],
      ['sm', true],
      ['md', false],
      ['lg', false],
      ['xl', false],
    ]);
    let start: boolean;
    grid.forEach((border, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = border;
      }
    });
    this.mobile = this.observableMedia
      .asObservable()
      .map(change => {
        console.log(change);
        console.log(grid.get(change.mqAlias));
        return grid.get(change.mqAlias);
      })
      .startWith(start);
  }
}
