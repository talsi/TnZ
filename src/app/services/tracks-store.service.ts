import { Injectable } from "@angular/core";
import { ISoundCloudTrack } from "../interfaces";
import { SoundCloudService } from "./sound-cloud.service";
import { Observable, Observer, Subscription } from "rxjs";
import "rxjs/add/operator/publishReplay";

@Injectable()
export class TracksStoreService {

  public tracks$: Observable<ISoundCloudTrack[]> =
    new Observable<ISoundCloudTrack[]>((o: Observer<ISoundCloudTrack[]>) => {
      let store: ISoundCloudTrack[] = [];
      this._soundCloudService.loadTracks().subscribe(
        tracks => o.next(store = store.concat(tracks)),
        err => {
          o.error(err);
          o.complete();
        }
      );
    }).publishReplay(1).refCount();

  constructor(private _soundCloudService: SoundCloudService) {

    let count = 0;
    let subscribe = this.tracks$.subscribe;
    this.tracks$.subscribe = function(){
      console.log(`subscribe ${++count}`);
      // console.log(this);
      // console.log(arguments);
      let subscription = subscribe.apply(this, arguments);
      let unsubscribe = subscription.unsubscribe;
      subscription.unsubscribe = function(){
        console.log(`unsubscribe ${--count}`);
        unsubscribe.apply(this, arguments);
        // console.log(this);
        // console.log(arguments);
      };
      return subscription;
    }
  }
}
