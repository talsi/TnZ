import {Component, ElementRef, Input, OnInit, Inject} from "@angular/core";
import {DurationPipe} from "../../pipes";
import {ISoundCloudTrack, SOUND_MANAGER, ISoundManager} from "../../interfaces";
import {PlayerService} from "../../services";

declare const $: any;

let durationPipe: DurationPipe = new DurationPipe();

@Component({
  selector: 'waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css'],
  host: {
    '(mousemove)': 'showSeekBar($event)',
    '(touchmove)': 'showSeekBar($event)',
    '(mouseleave)': 'hideSeekBar($event)',
    '(mouseup)': 'seekTrack($event)',
    '(touchend)': 'seekTrack($event)',
  }
})
export class WaveformComponent implements OnInit {

  @Input() public track: ISoundCloudTrack;

  public seekBarTime = '';
  public currentPosition = '';
  public seekBarPosition = 0;
  public progressBarPosition = 0;

  private _$el: any;
  private _seekBarWrapperWidth = 0;

  public constructor(private _el: ElementRef,
                     private _player: PlayerService,
                     @Inject(SOUND_MANAGER) private _soundManager: ISoundManager) {
    this._$el = $(this._el.nativeElement);
  }

  public ngOnInit() {
    this._seekBarWrapperWidth = this._$el.width();

    var sound = this._soundManager.getSoundById(this.track._id);
    if(sound) {
      this.setPosition(sound.position);
    }

    this._player.currentTrackPosition.subscribe((data) => {
      if(data.track === this.track) {
        this.setPosition(data.time);
      }
    })
  }

  private setPosition(time: number) {
    var percentage = ((time / this.track.duration) * 100);
    this.progressBarPosition = percentage;
    this.currentPosition = durationPipe.transform(time) + ' / ';
  }

  public showSeekBar(ev: any) {
    if(this.track !== this._player.activeTrack.getValue()) {
      return;
    }

    var x = (ev.pageX || ev.changedTouches[0].pageX) - this._$el.offset().left;
    var percentage = ((x / this._seekBarWrapperWidth) * 100);
    this.seekBarPosition = percentage;

    var millis = ((x / this._seekBarWrapperWidth) * this.track.duration);
    this.seekBarTime = durationPipe.transform(millis);
  }

  public seekTrack(ev: any) {
    if(this.track !== this._player.activeTrack.getValue()) {
      return;
    }

    this.hideSeekBar(ev);
    var x = (ev.pageX || ev.changedTouches[0].pageX) - this._$el.offset().left;
    var millis = ((x / this._seekBarWrapperWidth) * this.track.duration);
    this._player.seek(this.track, millis);
  }

  public hideSeekBar(ev: any) {
    if(this.track !== this._player.activeTrack.getValue()) {
      return;
    }

    this.seekBarPosition = 0;
    this.seekBarTime = '';
  }

  private parsePosition(position: number) {
    return position - 100; // parsing to negative value so it will go from left to right
  }

  public getProgressBarPosition() {
    return this.parsePosition(this.progressBarPosition);
  }

  public getSeekBarPosition() {
    return this.parsePosition(this.seekBarPosition);
  }
}
