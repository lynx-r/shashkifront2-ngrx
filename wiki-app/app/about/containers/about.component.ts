import { Component, OnInit } from '@angular/core';
import { Changelog } from '../models/changelog';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bc-home',
  template: `
    <bc-changelog-list [changelogs]="changelogs"></bc-changelog-list>
  `,
  styles: [
    `
      md-card {
        width: 400px;
        height: 300px;
        margin: 15px;
      }
    `,
  ],
})
export class AboutComponent implements OnInit {
  changelogs: Changelog[];

  constructor() {
    this.changelogs = [
      {
        version: 'Версия 0.0.1',
        date: '5.10.2017',
        description: 'Первая редакция',
        features: [
          {
            video: {
              src:
                'https://s3-eu-west-1.amazonaws.com/wiki.shashki.online/images-cdn/about/create-desk.gif',
              caption: 'Создание доски',
              thumb:
                'https://s3-eu-west-1.amazonaws.com/wiki.shashki.online/images-cdn/about/create-desk.gif',
            },
            feature: `Добавление статьи и доски`,
          },
          {
            video: {
              src:
                'https://s3-eu-west-1.amazonaws.com/wiki.shashki.online/images-cdn/about/edit-article.gif',
              caption: 'Редактирование статьи',
              thumb:
                'https://s3-eu-west-1.amazonaws.com/wiki.shashki.online/images-cdn/about/edit-article.gif',
            },
            feature: 'Редактирование статьи и метаинформации',
          },
          {
            video: {
              src:
                'https://s3-eu-west-1.amazonaws.com/wiki.shashki.online/images-cdn/about/add-draught.gif',
              caption: 'Добавление шашек',
              thumb:
                'https://s3-eu-west-1.amazonaws.com/wiki.shashki.online/images-cdn/about/add-draught.gif',
            },
            feature: 'Добавление шашек на доску',
          },
          {
            video: {
              src:
                'https://s3-eu-west-1.amazonaws.com/wiki.shashki.online/images-cdn/about/notation-view.gif',
              caption: 'Нотация',
              thumb:
                'https://s3-eu-west-1.amazonaws.com/wiki.shashki.online/images-cdn/about/notation-view.gif',
            },
            feature: 'Запись ходов и их просмотре в нотации',
          },
          {
            video: {
              src:
                'https://s3-eu-west-1.amazonaws.com/wiki.shashki.online/images-cdn/about/undo-redo.gif',
              caption: 'Отмена/повторение',
              thumb:
                'https://s3-eu-west-1.amazonaws.com/wiki.shashki.online/images-cdn/about/undo-redo.gif',
            },
            feature: 'Отмена/повторение хода',
          },
        ],
      },
    ];
  }

  ngOnInit() {}
}
