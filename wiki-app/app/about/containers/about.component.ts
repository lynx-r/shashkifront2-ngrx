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
              src: 'assets/img/about/create-desk.gif',
              caption: 'Создание доски',
              thumb: 'assets/img/about/create-desk.gif',
            },
            feature: `Добавление статьи и доски`,
          },
          {
            video: {
              src: 'assets/img/about/edit-article.gif',
              caption: 'Редактирование статьи',
              thumb: 'assets/img/about/edit-article.gif',
            },
            feature: 'Редактирование статьи и метаинформации',
          },
          {
            video: {
              src: 'assets/img/about/add-draught.gif',
              caption: 'Добавление шашек',
              thumb: 'assets/img/about/add-draught.gif',
            },
            feature: 'Добавление шашек на доску',
          },
          {
            video: {
              src: 'assets/img/about/notation-view.gif',
              caption: 'Нотация',
              thumb: 'assets/img/about/notation-view.gif',
            },
            feature: 'Запись ходов и их просмотре в нотации',
          },
          {
            video: {
              src: 'assets/img/about/undo-redo.gif',
              caption: 'Отмена/повторение',
              thumb: 'assets/img/about/undo-redo.gif',
            },
            feature: 'Отмена/повторение хода',
          },
        ],
      },
    ];
  }

  ngOnInit() {}
}
