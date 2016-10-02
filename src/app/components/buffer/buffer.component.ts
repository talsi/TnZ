import { Component, Input } from '@angular/core';
import { PlayerService } from "../../services";
import { ISoundCloudTrack } from "../../interfaces";

@Component({
  selector: 'track-buffer',
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.css']
})
export class BufferComponent {

  @Input() public track: ISoundCloudTrack;

  constructor(private _player: PlayerService) { }

  public isLoading(track: ISoundCloudTrack) {
    return this._player.activeTrack.getValue() === track && !track.isPlaying;
  }

}
