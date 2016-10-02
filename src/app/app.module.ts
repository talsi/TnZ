import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Ng2PaginationModule } from "ng2-pagination";
import { AppComponent } from "./app.component";
import { TnzRoutingModule } from "./app-routing.module";
import { DurationPipe, HebDatePipe, TracksPipe } from "./pipes";
import { SoundCloudService, PlayerService, TracksStoreService } from "./services";
import { SOUND_MANAGER, SOUND_CLOUD_SDK, SOUND_CLOUD_CONFIG } from "./interfaces";
import { ListViewComponent, PlayButtonComponent, PreLoaderComponent, WaveformComponent } from "./components";

declare const SC: any;
declare const soundManager: any;

@NgModule({
  declarations: [
    AppComponent,
    DurationPipe,
    HebDatePipe,
    TracksPipe,
    ListViewComponent,
    PlayButtonComponent,
    PreLoaderComponent,
    WaveformComponent
  ],
  imports: [
    TnzRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2PaginationModule
  ],
  providers: [
    PlayerService,
    TracksStoreService,
    SoundCloudService,
    {provide: SOUND_MANAGER, useValue: soundManager},
    {provide: SOUND_CLOUD_SDK, useValue: SC},
    {provide: SOUND_CLOUD_CONFIG, useValue: {
      CLIENT_ID: 'aea8a4424e55692d2417680c172aa53b',
      API_BASE_URL: 'https://w.soundcloud.com/player/?',
      QUERY: encodeURIComponent('טייכר וזרחוביץ\''),
      LIMIT: 200,
      LINKED_PARTITIONING: 1
    }}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
