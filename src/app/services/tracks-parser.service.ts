import { Injectable } from '@angular/core';
import { ISoundCloudTrack } from "../interfaces";
import { SOUND_CLOUD_CLIENT_ID, FULL_EPISODE_MINIMUM_DURATION_millis } from "../shared";

const WORDS_TO_REMOVE_FROM_TITLE = ["טייכר וזרחוביץ'", 'טייכר וזרחוביץ', 'ברדיו תל אביב,', 'ברדיו ת"א', 'יום', 'ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', ',', '-', '#', '[0-9]', 'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי ', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר', 'בינואר', 'בפברואר', 'במרץ', 'באפריל', 'במאי', 'ביוני', 'ביולי', 'באוגוסט', 'בספטמבר', 'באוקטובר', 'בנובמבר', 'בדצמבר', 'באגוסט', '2015', '2016'];
const regex = new RegExp(WORDS_TO_REMOVE_FROM_TITLE.join('|'), 'gi');

@Injectable()
export class TracksParserService {

  constructor() { }

  public parseTracks(data: ISoundCloudTrack[]): ISoundCloudTrack[] {

    return data.map((track: ISoundCloudTrack) => {
      track.stream_url +=  '?client_id=' + SOUND_CLOUD_CLIENT_ID;
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
      return track;
    });
  }
}
