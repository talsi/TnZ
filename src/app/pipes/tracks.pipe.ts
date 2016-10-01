import {Pipe, PipeTransform} from '@angular/core';
import {ITracksFilter, ISoundCloudTrack} from "../interfaces";

// TODO: merge consts (sound-cloud-service)
let FULL_EPISODE_MINIMUM_DURATION_millis = 1800000; // 30 minutes

@Pipe({
  name: 'tracksPipe'
})
export class TracksPipe implements PipeTransform {

  transform(tracks: any, dynamicTracksFilter: ITracksFilter = (tracks) => tracks): any {
    return tracks ? dynamicTracksFilter(tracks).sort((a, b) => a.created_at > b.created_at ? -1 : 1) : undefined;
  }
}

export let FULL_EPISODES_FILTER: ITracksFilter = (tracks: Array<ISoundCloudTrack>) =>  {
  return tracks.filter(track => track.duration > FULL_EPISODE_MINIMUM_DURATION_millis);
};

export let SKITS_FILTER: ITracksFilter = (tracks: Array<ISoundCloudTrack>) =>  {
  return tracks.filter(track => track.duration < FULL_EPISODE_MINIMUM_DURATION_millis);
};

// export let COMPILATIONS_FILTER: ITracksFilter = (tracks: Array<ISoundCloudTrack>) =>  {
//   return tracks.filter(track => track.isCompilation);
// };
//
// export let DOTAN_THE_TIGER_FILTER: ITracksFilter = (tracks: Array<ISoundCloudTrack>) =>  {
//   return tracks.filter(track => new RegExp('דותן|הנמר|נמר').test(track.displayName));
// };
