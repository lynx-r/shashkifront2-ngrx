import { Component, Input, OnInit } from '@angular/core';
import { AppConstants } from '../../../../core/services/app-constants';
import * as fromArticles from '../../../reducers';
import * as toolbar from '../../../actions/toolbar';
import { CookieService } from 'ngx-cookie';
import { Store } from '@ngrx/store';
import { Utils } from '../../../../core/services/utils.service';
import { MdButtonToggle } from '@angular/material';

@Component({
  selector: 'bc-place-draught-row',
  template: `
    <md-button-toggle-group #draughtSelected="mdButtonToggleGroup"
                            (change)="handleSelectDraught(draughtSelected.value)">
      <md-button-toggle value="," [checked]="!draught.queen && !draught.black && !deleteMode">
        <draught-edit [queen]="false" [black]="false"
                      [selected]="!draught.queen && !draught.black && !deleteMode"></draught-edit>
      </md-button-toggle>
      <md-button-toggle value="queen," [checked]="draught.queen && !draught.black && !deleteMode">
        <draught-edit [queen]="true" [black]="false"
                      [selected]="draught.queen && !draught.black && !deleteMode"></draught-edit>
      </md-button-toggle>
      <md-button-toggle value=",black" [checked]="!draught.queen && draught.black && !deleteMode">
        <draught-edit [queen]="false" [black]="true"
                      [selected]="!draught.queen && draught.black && !deleteMode"></draught-edit>
      </md-button-toggle>
      <md-button-toggle value="queen,black" [checked]="draught.queen && draught.black && !deleteMode">
        <draught-edit [queen]="true" [black]="true"
                      [selected]="draught.queen && draught.black && !deleteMode"></draught-edit>
      </md-button-toggle>
      <md-button-toggle value="remove" [checked]="deleteMode">
        <div class="remove-draught-container">
          <div class="remove-draught" [ngClass]="{'selected-remove': deleteMode}"></div>
        </div>
      </md-button-toggle>
    </md-button-toggle-group>
  `,
  styles: [
    `

    .remove-draught-container {
      height: 46px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .remove-draught {
      display: flex;
      justify-content: center;
      align-items: center;
      color: red;
      width: 38px;
      height: 38px;
      opacity: 0.3;
      border: 1px solid darkred;
      background-color: red;
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border-radius: 100%;
    }

    .remove-draught:hover {
      opacity: 1;
    }

    .remove-draught:before, .remove-draught:after {
      display: inline-block;
      content: ' ';
      height: 33px;
      width: 1px;
      background-color: white;
    }

    .remove-draught:before {
      transform: rotate(45deg);
    }

    .remove-draught:after {
      transform: rotate(-45deg);
    }

    .selected-remove {
      opacity: 1;
    }
  `,
  ],
})
export class PlaceDraughtRowComponent implements OnInit {
  deleteMode: boolean;
  draught: any;

  constructor(
    private cookieService: CookieService,
    private store: Store<fromArticles.State>
  ) {}

  ngOnInit() {
    this.deleteMode = Utils.stringToBoolean(
      this.cookieService.get(AppConstants.DELETE_DRAUGHT_CHECKED_COOKIE)
    );
    console.log('DELETE MODE', this.deleteMode);
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
      };
      this.cookieService.putObject(
        AppConstants.DRAUGHT_PLACE_COOKIE,
        this.draught
      );
    }
    this.draught = {
      ...this.draught,
      beaten: this.deleteMode,
    };
    this.store.dispatch(new toolbar.DraughtSelect(this.draught));
  }

  handleSelectDraught(mode: string) {
    if (mode == 'remove') {
      this.deleteMode = true;
      this.draught = {
        ...this.draught,
        beaten: this.deleteMode,
      };
      console.log('remove draught', this.draught);
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
}
