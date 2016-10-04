import { Component, OnInit } from "@angular/core";
import { IPaginationInstance } from "ng2-pagination";
import { ITracksFilter } from "../../interfaces";
import { StoreService, PlayerService } from "../../services";
import { ActivatedRoute } from "@angular/router";
import { TracksPipe } from "../../pipes";

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  public tracksFilter: ITracksFilter;

  public config: IPaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1
  };

  public constructor(private _route: ActivatedRoute,
                     public store: StoreService,
                     public player: PlayerService) { }

  public ngOnInit() {
    this.tracksFilter = <ITracksFilter> this._route.snapshot.data['filter'];
    let sub = this.store.tracks$.subscribe(tracks => {
      let pipe = new TracksPipe();
      let filtered = pipe.transform(tracks, this.tracksFilter);
      this.player.setInitial(filtered[0]);
      sub.unsubscribe();
    })
  }
}
