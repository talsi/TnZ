import { ISoundCloudTrack } from "./sound-cloud-track";
import { ISound } from "./sound-manager";

export interface IPlayerState {
  isPlaying: boolean
  track: ISoundCloudTrack
  sound: ISound
}
