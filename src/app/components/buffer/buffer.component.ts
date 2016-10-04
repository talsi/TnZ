import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../../services";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'buffering',
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.css']
})
export class BufferComponent implements OnInit {

  public buffering: boolean;

  constructor(public _player: PlayerService) { }

  ngOnInit() {
    let subscription: Subscription;
    this._player.state$.subscribe(state => {
      if(state.sound) subscription = state.sound.buffering$.subscribe(buffering => this.buffering = buffering);
      else if(subscription) subscription.unsubscribe();
    });
  }
}
