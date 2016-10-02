import { Component, OnInit } from "@angular/core";
import { IPaginationInstance } from "ng2-pagination";
import { ITracksFilter, ISoundCloudTrack } from "../../interfaces";
import { TracksStoreService, PlayerService } from "../../services";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  public isPaginationReady: boolean = false;
  public dynamicFilter: ITracksFilter;

  public config: IPaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1
  };

  public constructor(public tracksStore: TracksStoreService,
                     private _route: ActivatedRoute,
                     private _player: PlayerService) { }

  public ngOnInit() {
    this.dynamicFilter = <ITracksFilter> this._route.snapshot.data['filter'];
    this.tracksStore.tracks$.subscribe(() => {setTimeout(() => {this.isPaginationReady = true;})}); // bug workaround: ng2-pagination (https://github.com/michaelbromley/ng2-pagination/pull/54)
  }

  public isLoading(track: ISoundCloudTrack) {
    return this._player.activeTrack.getValue() === track && !track.isPlaying;
  }
}
