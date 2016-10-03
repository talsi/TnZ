import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { TracksStoreService } from "../../services";
import { IPaginationInstance } from "ng2-pagination";

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() config: IPaginationInstance;

  /** bug workaround: ng2-pagination (https://github.com/michaelbromley/ng2-pagination/pull/54) */
  ready$: Observable<boolean> = new Observable<boolean>(o => {
    let sub = this._tracksStore.tracks$.subscribe(() => {
      setTimeout(() => { sub.unsubscribe(); o.next(true); o.complete(); })
    });
  });

  constructor(private _tracksStore: TracksStoreService) { }

}
