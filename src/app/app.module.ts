import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Ng2PaginationModule } from "ng2-pagination";
import { AppComponent } from "./app.component";
import { TnzRoutingModule } from "./app-routing.module";
import { DurationPipe, HebDatePipe, TracksPipe } from "./pipes";
import { SoundCloudService, PlayerService, StoreService, TracksParserService } from "./services";
import { SOUND_MANAGER } from "./interfaces";
import { ListViewComponent, PlayButtonComponent, PreLoaderComponent, WaveformComponent } from "./components";
import { BufferComponent } from "./components/buffer/buffer.component";
import { PaginationComponent } from "./components/pagination/pagination.component";

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
    WaveformComponent,
    BufferComponent,
    PaginationComponent
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
    StoreService,
    SoundCloudService,
    TracksParserService,
    {provide: SOUND_MANAGER, useValue: soundManager}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
