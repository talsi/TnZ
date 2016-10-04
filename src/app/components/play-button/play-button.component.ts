import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../../services";
import { IPlayerState, ISoundCloudTrack } from "../../interfaces";
import { Observable } from "rxjs";

@Component({
  selector: 'play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css']
})
export class PlayButtonComponent implements OnInit {

  private _track: ISoundCloudTrack;
  public isPlaying: boolean;

  public constructor(public _player: PlayerService) { }

  ngOnInit(): void {
    this._player.state$.subscribe(state => {
      this.isPlaying = state.isPlaying;
      this._track = state.track;
    });
  }

  public onClick() {
    if (this.isPlaying) return this._player.pause();
    else return this._player.play(this._track);
  }
}
