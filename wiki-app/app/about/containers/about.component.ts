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
        description: 'Первый выпуск.',
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
            feature: 'Добавление шашек на доску',
          },
          {
            feature: 'Запись ходов',
          },
          {
            feature: 'Отмена/повторение хода',
          },
          {
            feature: 'Просмотр предыдущих ходов по нотации',
          },
          {
            feature: 'Список всех статей',
          },
          {
            feature: 'Редактирование статьи',
          },
          {
            feature: 'Редактирование метаинформации',
          },
        ],
      },
    ];
  }

  ngOnInit() {}
}
