import {Pipe, PipeTransform} from '@angular/core';
import {ITracksPipe, ISoundCloudTrack} from "../interfaces";
import { FULL_EPISODE_MINIMUM_DURATION_millis } from "../shared";

@Pipe({
  name: 'tracksPipe'
})
export class TracksPipe implements PipeTransform {

  transform(tracks: any, dynamicTracksFilter: ITracksPipe = (tracks) => tracks): any {
    return tracks ? dynamicTracksFilter(tracks).sort((a, b) => a.created_at > b.created_at ? -1 : 1) : undefined;
  }
}

export let FULL_EPISODES_FILTER: ITracksPipe = (tracks: ISoundCloudTrack[]) =>  {
  return tracks.filter(track => track.duration > FULL_EPISODE_MINIMUM_DURATION_millis);
};

export let SKITS_FILTER: ITracksPipe = (tracks: ISoundCloudTrack[]) =>  {
  return tracks.filter(track => track.duration < FULL_EPISODE_MINIMUM_DURATION_millis);
};
