import "@ngrx/core/add/operator/select";
import "rxjs/add/operator/map";
import "rxjs/add/operator/let";
import { Observable } from "rxjs/Observable";
import { combineLatest } from "rxjs/observable/combineLatest";
import { Actions, ActionTypes } from "../actions/sound";


export interface State {
  isPlaying: boolean;
  position: number;
  lastPosition: number;
};

const initialState: State = {
  isPlaying: false,
  position: null,
  lastPosition: null
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.Play:
      const sound = action.payload;
      return {
        isPlaying: true,
        position: sound.sm.position,
        lastPosition: sound.sm.lastPosition
      };

    case ActionTypes.Pause:
      const sound = action.payload;
      return {
        isPlaying: false,
        position: sound.sm.position,
        lastPosition: sound.sm.lastPosition
      };

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

// export function getBookEntities(state$: Observable<State>) {
//   return state$.select(state => state.entities);
// }
//
// export function getBookIds(state$: Observable<State>) {
//   return state$.select(state => state.ids);
// }
//
// export function getSelectedBookId(state$: Observable<State>) {
//   return state$.select(state => state.selectedBookId);
// }
//
// export function getSelectedBook(state$: Observable<State>) {
//   return combineLatest<{ [id: string]: Book }, string>(
//     state$.let(getBookEntities),
//     state$.let(getSelectedBookId)
//   )
//     .map(([ entities, selectedBookId ]) => entities[selectedBookId]);
// }
//
// export function getAllBooks(state$: Observable<State>) {
//   return combineLatest<{ [id: string]: Book }, string[]>(
//     state$.let(getBookEntities),
//     state$.let(getBookIds)
//   )
//     .map(([ entities, ids ]) => ids.map(id => entities[id]));
// }


// import { ActionReducer, Action } from "@ngrx/store";
// import { ITracksFilter, ISoundCloudTrack } from "../interfaces";
// import { FULL_EPISODE_MINIMUM_DURATION_millis } from "../shared";
//
// export const FULL_EPISODES = 'FULL_EPISODES';
// export const SKITS = 'SKITS';
//
// const fullEpisodesFilter: ITracksFilter = (tracks: ISoundCloudTrack[]) =>  {
//   return tracks.filter(track => track.duration > FULL_EPISODE_MINIMUM_DURATION_millis);
// };
//
// const skitsFilter: ITracksFilter = (tracks: ISoundCloudTrack[]) =>  {
//   return tracks.filter(track => track.duration < FULL_EPISODE_MINIMUM_DURATION_millis);
// };
//
// export const tracks: ActionReducer<ITracksFilter> = (state: ITracksFilter = fullEpisodesFilter, action: Action) => {
//
//   switch (action.type) {
//     case FULL_EPISODES:
//       return fullEpisodesFilter;
//
//     default:
//     case SKITS:
//       return skitsFilter;
//   }
// }
