import {Component, Input, OnInit} from "@angular/core";
import {IPaginationInstance} from "ng2-pagination";
import {ITracksFilter, ISoundCloudTrack} from "../../interfaces";
import {TracksStoreService, PlayerService} from "../../services";

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  @Input() public dynamicFilter: ITracksFilter;

  public tracks: ISoundCloudTrack[];
  public config: IPaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1
  };

  public constructor(private _tracksStore: TracksStoreService, private _player: PlayerService) { }

  public ngOnInit() {
    this._tracksStore.tracks.subscribe(tracks => {
      this.tracks = tracks.toArray();
    });
  }

  public isListReady() {
    return this.tracks && this.tracks.length > 0;
  }

  public isLoading(track: ISoundCloudTrack) {
    return this._player.activeTrack.getValue() === track && !track.isPlaying;
  }
}
