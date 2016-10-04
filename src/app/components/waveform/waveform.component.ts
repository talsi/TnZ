import { DurationPipe } from "../../pipes";
import { PlayerService } from "../../services";
import { Component, ElementRef, Input, OnInit, Inject, AfterViewInit } from "@angular/core";
import { ISoundCloudTrack, SOUND_MANAGER, ISoundManager, ISound, IPlayerState } from "../../interfaces";
import { Subscription } from "rxjs";

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
export class WaveformComponent implements OnInit, AfterViewInit {

  private _$el: any;
  private _seekBarWrapperWidth = 0;

  public seekBarTime;
  public currentPosition;
  public seekBarPosition = 0;
  public progressBarPosition = 0;
  public track: ISoundCloudTrack;

  constructor(private _el: ElementRef, private _player: PlayerService) { }

  public ngAfterViewInit() {
    this._$el = $(this._el.nativeElement);
    this._seekBarWrapperWidth = this._$el.width();
  }

  public ngOnInit() {
    let posSubscription: Subscription;
    this._player.state$.subscribe((pState: IPlayerState) => {
      if(this.track !== pState.track){
        this.track = pState.track;
        if(posSubscription) posSubscription.unsubscribe();
        if(pState.track && pState.sound) posSubscription = pState.sound.position$.subscribe(position => this.setPosition(position));
      }
    });
  }

  private setPosition(position: number) {
    var percentage = ((position / this.track.duration) * 100);
    this.progressBarPosition = percentage;
    this.currentPosition = durationPipe.transform(position) + ' / ';
  }

  public showSeekBar(ev: any) {
    var x = (ev.pageX || ev.changedTouches[0].pageX) - this._$el.offset().left;
    var percentage = ((x / this._seekBarWrapperWidth) * 100);
    this.seekBarPosition = percentage;

    var millis = ((x / this._seekBarWrapperWidth) * this.track.duration);
    this.seekBarTime = durationPipe.transform(millis);
  }

  public seekTrack(ev: any) {
    this.hideSeekBar(ev);
    var x = (ev.pageX || ev.changedTouches[0].pageX) - this._$el.offset().left;
    var millis = ((x / this._seekBarWrapperWidth) * this.track.duration);
    this._player.seek(millis);
  }

  public hideSeekBar(ev: any) {
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
