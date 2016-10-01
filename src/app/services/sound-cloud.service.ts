import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { SOUND_CLOUD_CONFIG, SOUND_CLOUD_SDK, ISoundCloudSDK, ISoundCloudConfig, ISoundCloudTrack } from "../interfaces";
import { Observable, Observer } from 'rxjs';

// TODO: merge consts (tracks-filter pipe)
let FULL_EPISODE_MINIMUM_DURATION_millis = 1800000; // 30 minutes
let WORDS_TO_REMOVE_FROM_TITLE = ["טייכר וזרחוביץ'", 'טייכר וזרחוביץ', 'ברדיו תל אביב,', 'ברדיו ת"א', 'יום', 'ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', ',', '-', '#', '[0-9]', 'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי ', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר', 'בינואר', 'בפברואר', 'במרץ', 'באפריל', 'במאי', 'ביוני', 'ביולי', 'באוגוסט', 'בספטמבר', 'באוקטובר', 'בנובמבר', 'בדצמבר', 'באגוסט', '2015', '2016'];
let SKITS_KEYWORDS = ['אליעד מלכי', 'כמעט שבת', 'ראובן', 'רמי קלינשטיין', 'מאיה ספאם', ['האסדה', 'אסדה'], 'פרסומות', 'יגאל שילון', ["דני סביצ'ה", "סביצ'ה"], 'תום יער', 'גן שרגלול', 'צח בראטר', 'דותן הנמר', ['מאיה ספאם', 'מאיה היחצנית'], 'עמי', 'קורל', 'אמ.סי ישמין', 'סולימן הרחב', 'אילנה', 'יוגה', "ג'רי פנדלבאום", 'לאה המטפלת', 'ד"ר גבעוני', ['כנרת האקסית', 'כנרת']];

@Injectable()
export class SoundCloudService {

  private _tracks: any = [];
  private _o: Observer<ISoundCloudTrack[]>;

  public constructor(@Inject(SOUND_CLOUD_CONFIG) private _config: ISoundCloudConfig,
                     @Inject(SOUND_CLOUD_SDK) private _sdk: ISoundCloudSDK,
                     @Inject(Http) private _http: Http) {
    this.initSDK();
  }

  private initSDK() {
    this._sdk.initialize({
      client_id: this._config.CLIENT_ID
    });
  }

  private populateList(data: any) {
    data = data || {};
    this._tracks = this._tracks.concat(data.collection || []);
    // if (data.next_href) {
    //   // we have more tracks - pagination. // TODO: load extra tracks in background.
    //   this._http.get(data.next_href)
    //       .subscribe(
    //           data => { this.populateList(data.json()); },
    //           err => { this.errorHandler(err); }
    //       );
    // } else {
      // no more tracks from server. let's start the app.
      this.parseTracks();
      this._o.next(this._tracks.slice(0, 16));
    // }
  }

  private parseTracks() {
    var regex = new RegExp(WORDS_TO_REMOVE_FROM_TITLE.join('|'), 'gi');
    this._tracks.forEach((track: any) => {
      track._id = '_' + track.id;
      track.stream_url +=  '?client_id=' + this._config.CLIENT_ID;
      track.displayName = track.title.replace(regex, '');
      if (new RegExp('אסדה').test(track.title)) {
        var episodeRegex = /פרק (\d+)/;
        var result: any;
        if ((result = episodeRegex.exec(track.title)) !== null) {
          if (result.index === episodeRegex.lastIndex) {
            episodeRegex.lastIndex++;
          }
          track.displayName += ' ' + result[1];
        }
      }
      if (track.duration > FULL_EPISODE_MINIMUM_DURATION_millis) {
        if (track.displayName.trim()) {
          track.displayName = "טייכר וזרחוביץ' - " + track.displayName;
          track.isCompilation = true;
        } else {
          // empty name
          track.displayName = "טייכר וזרחוביץ'";
        }
        // remove ()
        track.displayName = track.displayName.replace(/[{()}]/g, '');
      }
    });
  }

  private errorHandler(error: any) {
    console.error(error.message);
    this._o.error(error);
  }

  private getQuery(config: ISoundCloudConfig) {
    return {
      q: config.QUERY,
      limit: config.LIMIT,
      linked_partitioning: config.LINKED_PARTITIONING
    };
  }

  /**
   * Public API
   */
  public loadTracks(): Observable<ISoundCloudTrack[]> {
    let query = this.getQuery(this._config);
    return new Observable<ISoundCloudTrack[]>((o: Observer<ISoundCloudTrack[]>) => {
      this._o = o;
      this._sdk.get('/tracks', query)
        .then(data => {
          this.populateList(data);
        })
        .catch(err => {
          this.errorHandler(err);
        });
    });
  }
}
