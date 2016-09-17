import {Component, OnInit} from '@angular/core';
import {ITracksFilter} from "../../interfaces";
import {ALL_SKITS_FILTER, DOTAN_THE_TIGER_FILTER} from "../../pipes";

declare const $: any;

let filters: {[index: string]: ITracksFilter} = {
  'all-skits': ALL_SKITS_FILTER,
  'dotan-the-tiger': DOTAN_THE_TIGER_FILTER
};

@Component({
  selector: 'skits',
  templateUrl: './skits.component.html',
  styleUrls: ['./skits.component.css']
})
export class SkitsComponent implements OnInit {

  public dynamicFilter: ITracksFilter;

  public ngOnInit() {
    this.setFilter('all-skits');
    $('ul.tabs').tabs();
  }

  public setFilter(filterName: string) {
    this.dynamicFilter = filters[filterName];
  }
}
