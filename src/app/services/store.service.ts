// import { Injectable } from "@angular/core";
// import { ISoundCloudTrack } from "../interfaces";
// import { SoundCloudService } from "./sound-cloud.service";
// import { Observable, Observer } from "rxjs";
// import "rxjs/add/operator/publishReplay";
//
// @Injectable()
// export class StoreService {
//
//   public tracks$: Observable<ISoundCloudTrack[]> =
//     new Observable<ISoundCloudTrack[]>((o: Observer<ISoundCloudTrack[]>) => {
//       let store: ISoundCloudTrack[] = [];
//       this._soundCloudService.loadTracks().subscribe(
//         tracks => o.next(store = store.concat(tracks)),
//         err => { o.error(err); o.complete(); }
//       );
//     }).publishReplay(1).refCount();
//
//   constructor(private _soundCloudService: SoundCloudService) { }
// }
