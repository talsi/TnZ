import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {List} from "immutable";
import {ISoundCloudTrack} from "../interfaces";
import {SoundCloudService} from "./sound-cloud.service";

@Injectable()
export class TracksStoreService {

  private _tracks: BehaviorSubject<List<ISoundCloudTrack>> = new BehaviorSubject(List([]));

  constructor(private _soundCloudService: SoundCloudService) {
    this.loadTracks();
  }

  public get tracks(): BehaviorSubject<List<ISoundCloudTrack>>{
    return this._tracks;
  }

  private loadTracks() {
    this._soundCloudService.loadTracks()
        .subscribe(
            (res: ISoundCloudTrack[]) => this._tracks.next(List(res)),
            (err) => console.log('Error retrieving tracks')
        );
  }
}
