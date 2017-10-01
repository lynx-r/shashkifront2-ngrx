import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'draught-edit',
  template: `
    <div class="draught-edit-container">
      <div #draughtRef
           [ngStyle]="{'width': size + 'px', 'height': size + 'px', 'color': black ? 'black' : 'gray'}"
           [ngClass]="{
     'selected': selected,
     'draught': !queen,
     'draught-queen': queen}">
        <md-icon *ngIf="queen">spa</md-icon>
      </div>
    </div>
  `,
  styleUrls: ['./draught-edit.component.css'],
})
export class DraughtEditComponent implements OnInit {
  @Input() selected: boolean;
  @Input() black: boolean;
  @Input() queen: boolean;
  size: number;

  constructor() {}

  ngOnInit() {
    this.size = 38;
  }
}
