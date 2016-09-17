import {OpaqueToken} from '@angular/core';
import {Promise} from 'es6-promise';

export const SOUND_CLOUD_SDK = new OpaqueToken('sound-cloud.sdk');

export interface ISoundCloudSDK {
    initialize(param:{client_id: string}): void;
    get(url: string, params: any): Promise<any>;
    // stream(url: string): Promise<any>;
}
