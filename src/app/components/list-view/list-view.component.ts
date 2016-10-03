import { Component, OnInit } from "@angular/core";
import { IPaginationInstance } from "ng2-pagination";
import { ITracksFilter } from "../../interfaces";
import { TracksStoreService } from "../../services";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

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

  public constructor(public tracksStore: TracksStoreService, private _route: ActivatedRoute) { }

  public ngOnInit() {
    this.dynamicFilter = <ITracksFilter> this._route.snapshot.data['filter'];
  }
}
