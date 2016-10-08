import { OpaqueToken } from "@angular/core";
import { SoundManagerObj } from "../models";

export const SOUND_MANAGER = new OpaqueToken('sound-manager');

export interface ISoundManagerSettings {
  id: number
  url: string
  whileplaying(): void
  whileloading(): void
}

export interface ISoundManager {
  createSound(settings: ISoundManagerSettings): SoundManagerObj
  getSoundById(id: number): SoundManagerObj
  setPosition(id: number, millis: number): void
}
