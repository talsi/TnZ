import { Component, OnInit } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {ISoundCloudTrack} from "../../interfaces";
import {PlayerService} from "../../services";

@Component({
  selector: 'play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css']
})
export class PlayButtonComponent implements OnInit {

  @Input() public track: ISoundCloudTrack;

  public buttonType: string = 'play_arrow';

  public constructor(private _player: PlayerService) { }

  public ngOnInit() {
    this._player.activeTrack.subscribe(activeTrack => {
      this.buttonType = this.track === activeTrack ? 'pause' : 'play_arrow';
    });
  }

  public onTrackClicked() {
    if(this.track === this._player.activeTrack.getValue()) {
      this._player.pause();
    } else {
      this._player.play(this.track);
    }
  }

}
