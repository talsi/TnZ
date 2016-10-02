import { Injectable } from "@angular/core";
import { ISoundCloudTrack } from "../interfaces";
import { SoundCloudService } from "./sound-cloud.service";
import { Observable, Observer } from "rxjs";
import "rxjs/add/operator/share";

@Injectable()
export class TracksStoreService {

  private _tracks: ISoundCloudTrack[] = [];
  private _o: Observer<ISoundCloudTrack[]>;

  public tracks$: Observable<ISoundCloudTrack[]> = new Observable<ISoundCloudTrack[]>(o => this._o = o).share();

  constructor(private _soundCloudService: SoundCloudService) {
    this.loadTracks();
  }

  private loadTracks() {
    this._soundCloudService.loadTracks().subscribe(
      tracks => this._o.next(this._tracks = this._tracks.concat(tracks)),
      err => this._o.error(err),
      () => this._o.complete()
    );
  }
}
