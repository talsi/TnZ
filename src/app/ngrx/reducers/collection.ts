import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as collection from '../actions/collection';

export interface State {
  loaded: boolean;
  loading: boolean;
};

const initialState: State = {
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: collection.Actions): State {
  switch (action.type) {
    case collection.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loaded: false,
        loading: true
      });
    }

    case collection.ActionTypes.LOAD_SUCCESS: {
      return {
        loaded: true,
        loading: false
      };
    }

    default: {
      return state;
    }
  }
}

// export function getLoaded(state$: Observable<State>) {
//   return state$.select(s => s.loaded);
// }
//
// export function getLoading(state$: Observable<State>) {
//   return state$.select(s => s.loading);
// }
//
// export function getBookIds(state$: Observable<State>) {
//   return state$.select(s => s.ids);
// }
