import { Component, Input, OnInit } from '@angular/core';
import { Changelog } from '../models/changelog';
import { Lightbox, IAlbum } from 'angular2-lightbox';

@Component({
  selector: 'bc-changelog',
  template: `
    <md-card>
      <md-card-title>{{changelog.version}}</md-card-title>
      <md-card-subtitle>{{changelog.date}}</md-card-subtitle>
      <md-card-content>
        <p>{{changelog.description}}</p>
        <div fxLayout="row" *ngFor="let feature of changelog.features">
          <div>
            <img [src]="feature.video?.thumb" (click)="open(0)"/>
          </div>
          <div>
            {{feature.feature}}
          </div>
        </div>
      </md-card-content>
    </md-card>
  `,
  styleUrls: ['./changelog.component.css'],
})
export class ChangelogComponent implements OnInit {
  @Input() changelog: Changelog;

  private albums: IAlbum[] = [];

  constructor(private _lightbox: Lightbox) {}

  ngOnInit() {
    this.albums = this.changelog.features
      .map(feature => feature.video)
      .filter(element => element !== undefined);
  }

  open(index: number) {
    this._lightbox.open(this.albums, index);
  }
}
