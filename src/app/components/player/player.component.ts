import { Component } from "@angular/core";
import { PlayerService } from "../../services";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  constructor(public player: PlayerService) { }
}
