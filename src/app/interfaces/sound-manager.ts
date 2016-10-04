/**
 * Created by talsi on 07/05/2016.
 */
import { OpaqueToken } from "@angular/core";
import { Observable } from "rxjs";

export const SOUND_MANAGER = new OpaqueToken('sound-manager');

export interface ISound {
  play():  ISound
  pause(): ISound
  unload(): ISound
  position: number
  position$: Observable<number>
  buffering$: Observable<boolean>
}

export interface ISoundManagerSettings {
  id: number
  url: string
  whileplaying(): void
  whileloading(): void
}

export interface ISoundManager {
  getSoundById(id: number): ISound
  setPosition(id: number, millis: number): void
  createSound(settings: ISoundManagerSettings): ISound
}
