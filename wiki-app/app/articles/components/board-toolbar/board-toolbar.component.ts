import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import 'rxjs/Rx';
import { CookieService } from 'ngx-cookie';
import { AppConstants } from '../../../core/services/app-constants';
import { Utils } from '../../../core/services/utils.service';
import { Store } from '@ngrx/store';
import * as fromArticles from '../../reducers';
import * as toolbar from '../../actions/toolbar';
import { Undo, Redo } from '../../actions/board';
import { BoardBox } from '../../models/board-box';
import { getSelectedArticle, getSelectedBoard } from '../../reducers/index';

@Component({
  selector: 'ac-board-toolbar',
  templateUrl: './board-toolbar.component.html',
  styleUrls: ['./board-toolbar.component.css'],
})
export class BoardToolbarComponent implements OnInit {
  @Input() edit: boolean;
  @Input() createMode: boolean = true;

  backgroundColor: string;
  draught: any;

  mode: string;
  deleteMode: boolean;

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
    this.store.dispatch(new toolbar.PlaceModeToggle(this.mode));

    this.backgroundColor = Utils.getModeColor(this.mode);
    this.deleteMode = Utils.stringToBoolean(
      this.cookieService.get(AppConstants.DELETE_DRAUGHT_CHECKED_COOKIE)
    );
    if (!this.deleteMode) {
      this.cookieService.put(
        AppConstants.DELETE_DRAUGHT_CHECKED_COOKIE,
        'false'
      );
      this.deleteMode = false;
    }
    this.draught = this.cookieService.getObject(
      AppConstants.DRAUGHT_PLACE_COOKIE
    );
    if (!this.draught) {
      this.draught = {
        black: false,
        queen: false,
        beaten: this.deleteMode,
      };
      this.cookieService.putObject(
        AppConstants.DRAUGHT_PLACE_COOKIE,
        this.draught
      );
    }
    this.store.dispatch(new toolbar.DraughtSelect(this.draught));
  }

  toggleMode(mode: string) {
    this.mode = mode;
    this.cookieService.put(AppConstants.EDIT_MODE_COOKIE, mode);
    this.backgroundColor = Utils.getModeColor(mode);
    this.store.dispatch(new toolbar.PlaceModeToggle(mode));
  }

  handleSelectDraught(mode: string) {
    if (mode == 'remove') {
      this.deleteMode = true;
      this.draught = {
        ...this.draught,
        beaten: this.deleteMode,
      };
      this.store.dispatch(new toolbar.DraughtSelect(this.draught));

      this.cookieService.put(
        AppConstants.DELETE_DRAUGHT_CHECKED_COOKIE,
        `${this.deleteMode}`
      );
    } else {
      this.deleteMode = false;
      this.cookieService.put(
        AppConstants.DELETE_DRAUGHT_CHECKED_COOKIE,
        `${this.deleteMode}`
      );

      let draughtMode = mode.split(',');
      this.draught = {
        ...this.draught,
        queen: draughtMode[0] == 'queen',
        black: draughtMode[1] == 'black',
        beaten: this.deleteMode,
      };
      this.store.dispatch(new toolbar.DraughtSelect(this.draught));

      this.cookieService.putObject(
        AppConstants.DRAUGHT_PLACE_COOKIE,
        this.draught
      );
    }
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

  handleOpenCreateArticle() {
    this.store.dispatch(new toolbar.OpenCreateArticleDialog(true));
  }

  handleSaveArticle() {
    this.store
      .select(getSelectedArticle)
      .do(selected => this.store.dispatch(new toolbar.SaveArticle(selected)))
      .take(1)
      .subscribe();
  }
}
