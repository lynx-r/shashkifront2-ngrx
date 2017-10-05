import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bc-home',
  template: `
    <h1>О сайте</h1>
    <md-card>
      <md-card-title>Версия 0.0.1</md-card-title>
      <md-card-subtitle>5.10.2017</md-card-subtitle>
      <md-card-content>
        <ul>
          <li>Добавление шашек на доску</li>
          <li>Запись ходов</li>
          <li>Отмена/повторение хода</li>
          <li>Просмотре предыдущих ходов по нотации</li>
          <li>Список всех статей</li>
          <li>Редактирование статьи</li>
          <li>Редактирование метаинформации</li>
        </ul>
      </md-card-content>
    </md-card>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
