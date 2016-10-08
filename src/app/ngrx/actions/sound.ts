import { Action } from '@ngrx/store';
import { Sound } from '../../models';
import { type } from '../../utils';

export const ActionTypes = {
  Play:           type('[Sound] Play'),
  Pause:          type('[Sound] Pause'),
};

export class PlayAction implements Action {
  type = ActionTypes.Play;
  constructor(public payload: Sound) { }
}

export class PauseAction implements Action {
  type = ActionTypes.Pause;
  constructor(public payload: Sound) { }
}

export type Actions = PlayAction | PauseAction;
