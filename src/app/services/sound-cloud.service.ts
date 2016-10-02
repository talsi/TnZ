import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ISoundCloudTrack } from "../interfaces";
import { TracksParserService } from "./tracks-parser.service";
import { Observable, Observer } from 'rxjs';

const query = {
  q: encodeURIComponent('טייכר וזרחוביץ\''),
  limit: 200,
  linked_partitioning: 1
};

@Injectable()
export class SoundCloudService {

  public constructor(private _http: Http, private _tracksParser: TracksParserService) { }

  public loadTracks(): Observable<ISoundCloudTrack[]> {
    return new Observable<ISoundCloudTrack[]>((o: Observer<ISoundCloudTrack[]>) => {
      let partitionsLoader = (url: string, body?: any) => {
        let next_href: string  = '';
        this._http.get(url, {body: body})
          .map(data => data.json())
          .subscribe(
            data => { o.next(this._tracksParser.parseTracks(data)); next_href = data['next_href']; },
            err => { o.error(err); o.complete(); },
            () => { if(next_href) { partitionsLoader(next_href); } else { o.complete(); } }
          );
      };
      partitionsLoader('/tracks', query);
    });
  }
}
