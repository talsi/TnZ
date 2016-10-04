import {ISoundCloudTrack} from './sound-cloud-track';

export interface ITracksFilter {
  (tracks: ISoundCloudTrack[]): ISoundCloudTrack[];
};
