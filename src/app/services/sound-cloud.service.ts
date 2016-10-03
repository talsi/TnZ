import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { ISoundCloudTrack } from "../interfaces";
import { TracksParserService } from "./tracks-parser.service";
import { Observable, Observer } from 'rxjs';
import { SOUND_CLOUD_CLIENT_ID } from "../shared";

const API_BASE_URL = 'https://api.soundcloud.com';
const TRACKS_ENDPOINT = `${API_BASE_URL}/tracks`;

const query: URLSearchParams = new URLSearchParams();
query.set('q', encodeURIComponent('טייכר וזרחוביץ\''));
query.set('client_id', SOUND_CLOUD_CLIENT_ID);
query.set('limit',  '200');
query.set('linked_partitioning',  '1');
query.set('format',  'json');

@Injectable()
export class SoundCloudService {

  public constructor(private _http: Http, private _tracksParser: TracksParserService) { }

  public loadTracks(): Observable<ISoundCloudTrack[]> {
    return new Observable<ISoundCloudTrack[]>((o: Observer<ISoundCloudTrack[]>) => {
      let partitionsLoader = (url: string, query?: any) => {
        let next_href: string  = '';
        this._http.get(url, {search: query})
          .map(data => data.json())
          .subscribe(
            data => { o.next(this._tracksParser.parseTracks(data)); next_href = data['next_href']; },
            err => { o.error(err); o.complete(); },
            () => { if(next_href) { partitionsLoader(next_href); } else { o.complete(); } }
          );
      };
      partitionsLoader(TRACKS_ENDPOINT, query);
    });
  }
}
