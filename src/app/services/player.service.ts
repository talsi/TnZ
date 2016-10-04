import { Observable, Observer } from "rxjs";
import { Injectable, Inject } from "@angular/core";
import { ISoundCloudTrack, SOUND_MANAGER, ISoundManager, ISound, IPlayerState } from "../interfaces";

@Injectable()
export class PlayerService {

  private _sounds: {[key: number]: ISound} = {};

  private _state: IPlayerState = { track: null, sound: null, isPlaying: false };
  private _stateObserver: Observer<IPlayerState>;
  public state$: Observable<IPlayerState> =
    new Observable<IPlayerState>(
      (o: Observer<IPlayerState>) => { this._stateObserver = o; })
        .startWith(this._state).share();

  public constructor(@Inject(SOUND_MANAGER) private _soundManager: ISoundManager) { }

  public setInitial(track: ISoundCloudTrack) {
    this._stateObserver.next(this._state = { track: track, sound: null, isPlaying: false })
  }

  public pause() {
    const currentTrack = this._state.track;
    if(!currentTrack)
      return;

    this._soundManager.getSoundById(currentTrack.id).pause().unload();
    this._stateObserver.next(this._state = { track: this._state.track, sound: this._state.sound, isPlaying: false });
  }

  public play(track: ISoundCloudTrack) {
    if(track === this._state.track && this._state.isPlaying)
      return;

    if(this._state.isPlaying)
      this.pause();

    if(!track) track = this._state.track;
    const sound: ISound = this.getOrCreateSound(track).play();
    this._stateObserver.next(this._state = { track: track, sound: sound, isPlaying: true });

    if(track.lastPosition)
      this.seek(track.lastPosition);
  }

  public seek(millis: number) {
    if(!this._state.track) return;
    this._soundManager.setPosition(this._state.track.id, millis);
  }

  private getOrCreateSound(track: ISoundCloudTrack): ISound {

    if(this._sounds[track.id]){
      return this._sounds[track.id];
    }

    let prevTime: Date = null;
    let posObserver: Observer<number>;
    let buffObserver: Observer<boolean>;

    const sound: ISound = this._soundManager.createSound({
      id: track.id,
      url: track.stream_url,
      whileplaying: () => {
        if(buffObserver) buffObserver.next(false);
        if(posObserver) posObserver.next(sound.position);
        prevTime = new Date();
      },
      whileloading: () => {
        let currTime: Date = new Date();
        if(!prevTime || (currTime.getTime() - prevTime.getTime() > 1000)) {
          if(buffObserver) buffObserver.next(true);
        }
      }
    });

    sound.position$ = new Observable<number>((o: Observer<number>) => { posObserver = o });
    sound.buffering$ = new Observable<boolean>((o: Observer<boolean>) => { buffObserver = o });

    return this._sounds[track.id] = sound;
  }
}
