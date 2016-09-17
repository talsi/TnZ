import {ISoundCloudTrack} from './sound-cloud-track';

export interface ITracksFilter {
    (tracks: Array<ISoundCloudTrack>): Array<ISoundCloudTrack>;
};
