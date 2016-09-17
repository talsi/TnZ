import {Component, OnInit} from "@angular/core";
import {ITracksFilter} from "../../interfaces";
import {FULL_EPISODES_FILTER, COMPILATIONS_FILTER} from "../../pipes";

declare const $: any;

let filters: {[index: string]: ITracksFilter} = {
  'all': FULL_EPISODES_FILTER,
  'compilations': COMPILATIONS_FILTER
};

@Component({
  selector: 'full-episodes',
  templateUrl: './full-episodes.component.html',
  styleUrls: ['./full-episodes.component.css']
})
export class FullEpisodesComponent implements OnInit {

  public dynamicFilter: ITracksFilter;

  public ngOnInit() {
    this.setFilter('all');
    $('ul.tabs').tabs();
  }

  public setFilter(filterName: string) {
    this.dynamicFilter = filters[filterName];
  }
}
