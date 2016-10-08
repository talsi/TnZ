import { ActionReducer, combineReducers } from "@ngrx/store";
import { player } from "./player";
import { tracks } from "./sound";

export const app: ActionReducer = combineReducers({
  player,
  tracks
});
