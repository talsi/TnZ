/**
 * Created by talsi on 07/05/2016.
 */
import {OpaqueToken} from '@angular/core';

export const SOUND_MANAGER = new OpaqueToken('sound-manager');

export interface ISoundManager {
    getSoundById(id: string): any;
    setPosition(id: string, millis: number): any;
    createSound(settings: any): any;
}
