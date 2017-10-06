import { Component, Input, OnInit } from '@angular/core';
import { Changelog } from '../models/changelog';

@Component({
  selector: 'bc-changelog-list',
  template: `
    <bc-changelog *ngFor="let changelog of changelogs" [changelog]="changelog"></bc-changelog>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
})
export class ChangelogListComponent implements OnInit {
  @Input() changelogs: Changelog[];

  constructor() {}

  ngOnInit() {}
}
