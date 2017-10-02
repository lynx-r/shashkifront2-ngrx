import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { of } from 'rxjs/observable/of';

import * as board from '../actions/board';
import * as square from '../actions/square';
import { BoardService } from '../../core/services/board.service';
import { BoardBox } from '../models/board-box';
import { Square } from '../models/square';
import { getSelectedBoard } from '../reducers/index';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class BoardEffects {
  @Effect()
  squareClick$: Observable<Action> = this.actions$
    .ofType(board.CLICK)
    .mergeMap((action: board.Click) =>
      this.boardService.highlightBoard(action.payload)
    )
    .mergeMap(highlighted => [new board.Load(highlighted)])
    .catch(err => of(new board.LoadFail(err)));

  @Effect()
  squareMove$: Observable<Action> = this.actions$
    .ofType(board.MOVE)
    .mergeMap((action: board.Move) => this.boardService.move(action.payload))
    .mergeMap(updated => [new board.Load(updated)])
    .catch(err => of(new board.LoadFail(err)));

  @Effect()
  addDraught$: Observable<Action> = this.actions$
    .ofType(board.ADD_DRAUGHT)
    .mergeMap((action: board.AddDraught) =>
      this.boardService.addDraught(action.payload)
    )
    .map(updated => new board.Update(updated))
    .catch(err => of(new board.LoadFail(err)));

  @Effect()
  undo$: Observable<Action> = this.actions$
    .ofType(board.UNDO)
    .map((action: board.Undo) => action.payload)
    .switchMap((selected: BoardBox) => this.boardService.undo(selected))
    .map((updated: BoardBox) => new board.Load(updated))
    .catch(err => of(new board.LoadFail(err)));

  @Effect()
  redo$: Observable<Action> = this.actions$
    .ofType(board.REDO)
    .map((action: board.Redo) => action.payload)
    .switchMap((selected: BoardBox) => this.boardService.redo(selected))
    .map((updated: BoardBox) => new board.Load(updated))
    .catch(err => of(new board.LoadFail(err)));

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
