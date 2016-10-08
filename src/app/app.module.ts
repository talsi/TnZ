import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Ng2PaginationModule } from "ng2-pagination";
import { AppComponent } from "./app.component";
import { TnzRoutingModule } from "./app-routing.module";
import { DurationPipe, HebDatePipe } from "./pipes";
import { SoundCloudService, PlayerService, TracksParserService } from "./services";
import { SOUND_MANAGER } from "./interfaces";
import { ListViewComponent, PlayButtonComponent, PreLoaderComponent, WaveformComponent } from "./components";
import { BufferComponent } from "./components/buffer/buffer.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { PlayerComponent } from './components/player/player.component';
import { StoreModule } from "@ngrx/store";
import { app } from "./ngrx";
import { EffectsModule } from "@ngrx/effects";
import { MaterialModule } from "@angular/material";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { CollectionEffects, SoundEffects } from "./ngrx/effects";

declare const soundManager: any;

@NgModule({
  declarations: [
    AppComponent,
    DurationPipe,
    HebDatePipe,
    ListViewComponent,
    PlayButtonComponent,
    PreLoaderComponent,
    WaveformComponent,
    BufferComponent,
    PaginationComponent,
    PlayerComponent
  ],
  imports: [
    TnzRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    StoreModule.provideStore({app: app}),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(CollectionEffects),
    EffectsModule.run(SoundEffects),
    Ng2PaginationModule
  ],
  providers: [
    PlayerService,
    SoundCloudService,
    TracksParserService,
    {provide: SOUND_MANAGER, useValue: soundManager}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
