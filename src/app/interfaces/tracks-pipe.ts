import {ISoundCloudTrack} from './sound-cloud-track';

export interface ITracksPipe {
    (tracks: Array<ISoundCloudTrack>): Array<ISoundCloudTrack>;
};
