import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromBooks from '../reducers';
import * as collection from '../actions/collection';
import { Book } from '../models/book';

@Component({
  selector: 'bc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>My Collection</md-card-title>
    </md-card>

    <bc-book-preview-list [books]="article$ | async"></bc-book-preview-list>
  `,
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   */
  styles: [
    `
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `,
  ],
})
export class CollectionPageComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(private store: Store<fromBooks.State>) {
    this.books$ = store.select(fromBooks.getBookCollection);
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
  }
}
