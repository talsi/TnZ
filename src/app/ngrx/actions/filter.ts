import { Sound } from "../../models";

export interface ITracksFilter {
  (tracks: Sound[]): Sound[];
};
