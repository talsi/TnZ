import { Component, OnInit } from "@angular/core";
import { IPaginationInstance } from "ng2-pagination";
import { ITracksPipe } from "../../interfaces";
import { StoreService } from "../../services";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  public pipe: ITracksPipe;

  public config: IPaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1
  };

  public constructor(private _route: ActivatedRoute, public store: StoreService) { }

  public ngOnInit() {
    this.pipe = <ITracksPipe> this._route.snapshot.data['pipe'];
  }
}
