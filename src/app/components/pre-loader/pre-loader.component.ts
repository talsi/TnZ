import {Component, OnInit} from "@angular/core";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'pre-loader',
  templateUrl: './pre-loader.component.html',
  styleUrls: ['./pre-loader.component.css']
})
export class PreLoaderComponent implements OnInit {

  @Input() isActive: boolean;

  constructor() { }

  ngOnInit() {
  }

}
