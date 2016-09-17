import {OpaqueToken} from '@angular/core';

export const SOUND_CLOUD_CONFIG = new OpaqueToken('sound-cloud.config');

export interface ISoundCloudConfig {
    CLIENT_ID: string;
    API_BASE_URL: string;
    QUERY: string;
    LIMIT: number;
    LINKED_PARTITIONING: number;
}
