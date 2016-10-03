import { BehaviorSubject } from "rxjs";
import { Injectable, Inject } from "@angular/core";
import { ISoundCloudTrack, SOUND_MANAGER, ISoundManager, ITrackPosition, ISound } from "../interfaces";

@Injectable()
export class PlayerService {

  private _activeTrack: BehaviorSubject<ISoundCloudTrack> = new BehaviorSubject<ISoundCloudTrack>(undefined);
  private _currentTrackPosition: BehaviorSubject<ITrackPosition> = new BehaviorSubject<ITrackPosition>({track: undefined, time: 0});

  public constructor(@Inject(SOUND_MANAGER) private _soundManager: ISoundManager) { }

  public get currentTrackPosition(): BehaviorSubject<{track: ISoundCloudTrack, time: number}>{
    return this._currentTrackPosition;
  }

  public get activeTrack(): BehaviorSubject<ISoundCloudTrack> {
    return this._activeTrack;
  }

  public pause() {
    let currentTrack = this._activeTrack.getValue();
    if(currentTrack) {
      this._soundManager.getSoundById(currentTrack._id).pause();
      currentTrack.isPlaying = false;
      this._activeTrack.next(undefined);
    }
  }

  public play(track: ISoundCloudTrack) {
    this.pause();
    this.createSound(track).play();
    this._activeTrack.next(track);
  }

  public seek(track: ISoundCloudTrack, millis: number) {
    if(track !== this._activeTrack.getValue()) {
      this.play(track);
    }
    this._soundManager.setPosition(track._id, millis);
  }

  private createSound(track: ISoundCloudTrack): ISound {
    let prevTime: Date = null;
    const sound: ISound = this._soundManager.createSound({
      id: track._id,
      url: track.stream_url,
      whileplaying: () => {
        track.isPlaying = true;
        this._currentTrackPosition.next({track: this._activeTrack.getValue(), time: sound.position});
        prevTime = new Date();
      },
      whileloading: () => {
        let currTime: Date = new Date();
        if(!prevTime || (currTime.getTime() - prevTime.getTime() > 1000)) {
          track.isPlaying = false;
        }
      }
    });
    return sound;
  }
}
