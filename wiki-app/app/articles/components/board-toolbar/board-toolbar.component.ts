import { Component, Input, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { CookieService } from 'ngx-cookie';
import { AppConstants } from '../../../core/services/app-constants';
import { Utils } from '../../../core/services/utils.service';
import { Store } from '@ngrx/store';
import * as fromArticles from '../../reducers';
import * as toolbar from '../../actions/toolbar';
import { Undo, Redo, MakeWhiteStroke } from '../../actions/board';
import { BoardBox } from '../../models/board-box';
import { getSelectedBoard } from '../../reducers/index';

@Component({
  selector: 'ac-board-toolbar',
  templateUrl: './board-toolbar.component.html',
  styleUrls: ['./board-toolbar.component.css'],
})
export class BoardToolbarComponent implements OnInit {
  @Input() create: boolean;
  @Input() createMode: boolean = true;

  backgroundColor: string;

  mode: string;

  constructor(
    private cookieService: CookieService,
    private store: Store<fromArticles.State>
  ) {}

  ngOnInit() {
    this.mode = this.cookieService.get(AppConstants.EDIT_MODE_COOKIE);
    if (!this.mode) {
      this.cookieService.put(
        AppConstants.EDIT_MODE_COOKIE,
        AppConstants.WRITE_MODE
      );
      this.mode = AppConstants.WRITE_MODE;
    }
    console.log('MODE INIT', this.mode);
    this.store.dispatch(new toolbar.PlaceModeToggle(this.mode));

    this.backgroundColor = Utils.getModeColor(this.mode);
  }

  toggleMode(mode: any) {
    console.log('TOGGLE MODE', mode);
    this.mode = mode;
    this.cookieService.put(AppConstants.EDIT_MODE_COOKIE, mode);
    this.backgroundColor = Utils.getModeColor(mode);
    this.store.dispatch(new toolbar.PlaceModeToggle(mode));
  }

  handleUndo() {
    this.store
      .select(getSelectedBoard)
      .do((selected: BoardBox) => this.store.dispatch(new Undo(selected)))
      .take(1)
      .subscribe();
  }

  handleRedo() {
    this.store
      .select(getSelectedBoard)
      .do((selected: BoardBox) => this.store.dispatch(new Redo(selected)))
      .take(1)
      .subscribe();
  }

  handleMakeWhiteStroke() {
    this.store
      .select(getSelectedBoard)
      .do(selected => this.store.dispatch(new MakeWhiteStroke(selected)))
      .take(1)
      .subscribe();
  }

  handleOpenCreateArticle() {
    this.store.dispatch(new toolbar.OpenCreateArticleDialog(true));
  }
}
