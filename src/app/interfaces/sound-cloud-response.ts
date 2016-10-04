import { ISoundCloudTrack } from "./sound-cloud-track";

export interface ISoundCloudResponse {
  collection: ISoundCloudTrack[],
  next_href?: string
}
