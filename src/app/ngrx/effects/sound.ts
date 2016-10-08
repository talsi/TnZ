import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/skip";
import "rxjs/add/operator/takeUntil";
import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import * as sound from "../actions/sound";

@Injectable()
export class SoundEffects {

  constructor(
    private _actions$: Actions
  ) { }

  @Effect()
  play$: Observable<Action> = this._actions$
    .ofType(sound.ActionTypes.Play)
    .switchMap(sound => of(new sound.PlayAction(sound)));
}
