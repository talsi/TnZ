import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { StoreService } from "../../services";
import { IPaginationInstance } from "ng2-pagination";

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() public config: IPaginationInstance;

  /** bug workaround: ng2-pagination (https://github.com/michaelbromley/ng2-pagination/pull/54) */
  // public ready$: Observable<boolean> = this._store.tracks$.map(tracks => true).take(1).delay(1); // TODO: issue with subscribing over and over again
  public ready$: Observable<boolean> = new Observable<boolean>(o => {
    let sub = this._store.tracks$.subscribe(() => {
      setTimeout(() => { sub.unsubscribe(); o.next(true); o.complete(); })
    });
  });

  constructor(private _store: StoreService) { }

}
