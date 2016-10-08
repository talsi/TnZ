// import { Pipe, PipeTransform } from "@angular/core";
// import { ITracksFilter, ISoundCloudTrack } from "../interfaces";
// import { FULL_EPISODE_MINIMUM_DURATION_millis } from "../shared";
//
// // TODO: separate the sorting part into a standalone pipe - should run only once.
// // TODO: add "select first list item on init" pipe
//
// @Pipe({
//   name: 'tracksPipe'
// })
// export class TracksPipe implements PipeTransform {
//
//   transform(tracks: any, filter: ITracksFilter = (tracks) => tracks): any {
//     return tracks ? filter(tracks).sort((a, b) => a.created_at > b.created_at ? -1 : 1) : undefined;
//   }
// }
