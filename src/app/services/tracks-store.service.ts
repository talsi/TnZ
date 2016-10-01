import { Injectable } from "@angular/core";
import { ISoundCloudTrack } from "../interfaces";
import { SoundCloudService } from "./sound-cloud.service";
import { Observable, Observer } from "rxjs";
import "rxjs/add/operator/share";

@Injectable()
export class TracksStoreService {

  private _tracks: ISoundCloudTrack[] = [];

  public tracks$: Observable<ISoundCloudTrack[]> = new Observable<ISoundCloudTrack[]>((o: Observer<ISoundCloudTrack[]>) => {
    this._soundCloudService.loadTracks().subscribe(
      tracks => o.next(this._tracks = this._tracks.concat(tracks)),
      err => o.error(err),
      () => o.complete()
    );
  }).share();

  constructor(private _soundCloudService: SoundCloudService) { }
}
