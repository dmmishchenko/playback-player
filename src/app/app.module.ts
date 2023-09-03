import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { PLAYBACK_REPOSITORY_TOKEN } from './base/tokens'
import { PlaybackPlayerModule } from './playback-player/playback-player.module'
import { PlaybackRepositoryService } from './repositories/playback-repository.service'
@NgModule({
  imports: [BrowserModule, HttpClientModule, PlaybackPlayerModule],
  declarations: [AppComponent],
  providers: [{ provide: PLAYBACK_REPOSITORY_TOKEN, useClass: PlaybackRepositoryService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
