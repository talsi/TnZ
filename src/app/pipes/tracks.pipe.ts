import { Pipe, PipeTransform } from "@angular/core";
import { ITracksFilter, ISoundCloudTrack } from "../interfaces";
import { FULL_EPISODE_MINIMUM_DURATION_millis } from "../shared";

@Pipe({
  name: 'tracksPipe'
})
export class TracksPipe implements PipeTransform {

  transform(tracks: any, filter: ITracksFilter = (tracks) => tracks): any {
    return tracks ? filter(tracks).sort((a, b) => a.created_at > b.created_at ? -1 : 1) : undefined;
  }
}

export const FULL_EPISODES: ITracksFilter = (tracks: ISoundCloudTrack[]) =>  {
  return tracks.filter(track => track.duration > FULL_EPISODE_MINIMUM_DURATION_millis);
};

export const SKITS: ITracksFilter = (tracks: ISoundCloudTrack[]) =>  {
  return tracks.filter(track => track.duration < FULL_EPISODE_MINIMUM_DURATION_millis);
};
