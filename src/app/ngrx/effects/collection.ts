import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { SoundCloudService } from "../../services";
import * as collection from '../actions/collection';
import { SoundCloudObj, Sound } from "../../models";


@Injectable()
export class CollectionEffects {

  constructor(
    private _actions$: Actions,
    private _soundCloudSrv: SoundCloudService
  ) { }

  @Effect()
  loadCollection$: Observable<Action> = this._actions$
    .ofType(collection.ActionTypes.LOAD)
    .startWith(new collection.LoadAction())
    .switchMap(() => {
      return this._soundCloudSrv.loadTracks()
        .map((sound: SoundCloudObj): Sound => ({sc: sound, sm: undefined}))
        .toArray()
        .map((sounds: Sound[]) => new collection.LoadSuccessAction(sounds))
        .catch(error => of(new collection.LoadFailAction(error)))
    });

  // @Effect()
  // filter$: Observable<Action> = this._actions$
  //   .ofType(collection.ActionTypes.LOAD)
  //   .startWith(new collection.LoadAction())
  //   .switchMap(() => this._soundCloudSrv.loadTracks()
  //     .map((sound: SoundCloudObj): Sound => ({sc: sound, sm: undefined}))
  //     .toArray()
  //     .map((sounds: Sound[]) => new collection.LoadSuccessAction(sounds))
  //     .catch(error => of(new collection.LoadFailAction(error)))
  //   );
  //
  // @Effect()
  // search: Observable<Action> = this._actions$
  //   .ofType(collection.ActionTypes.LOAD)
  //   .startWith(new collection.LoadAction())
  //   .switchMap(() => this._soundCloudSrv.loadTracks()
  //     .map((sound: SoundCloudObj): Sound => ({sc: sound, sm: undefined}))
  //     .toArray()
  //     .map((sounds: Sound[]) => new collection.LoadSuccessAction(sounds))
  //     .catch(error => of(new collection.LoadFailAction(error)))
  //   );
}
