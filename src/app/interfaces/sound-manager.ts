/**
 * Created by talsi on 07/05/2016.
 */
import { OpaqueToken } from "@angular/core";

export const SOUND_MANAGER = new OpaqueToken('sound-manager');

export interface ISound {
  play():  void
  pause(): void
  unload(): void
  position: number
  prevPosition: number
}

export interface ISoundManagerSettings {
  id: string;
  url: string;
  whileplaying(): void;
  whileloading(): void;
}

export interface ISoundManager {
  getSoundById(id: string): ISound;
  setPosition(id: string, millis: number): void;
  createSound(settings: ISoundManagerSettings): ISound;
}
