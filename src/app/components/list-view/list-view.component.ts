import { Component, OnInit } from "@angular/core";
import { IPaginationInstance } from "ng2-pagination";
import { ITracksFilter, ISoundCloudTrack } from "../../interfaces";
import { TracksStoreService, PlayerService } from "../../services";
import { ActivatedRoute } from "@angular/router";

// TODO: flux/redux?

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

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
  }

  public isLoading(track: ISoundCloudTrack) {
    return this._player.activeTrack.getValue() === track && !track.isPlaying;
  }
}
