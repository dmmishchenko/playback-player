import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { PlaybackPlayerModule } from './playback-player/playback-player.module'
import { PLAYBACK_REPOSITORY_TOKEN } from './base/tokens'
import { PlaybackRepositoryService } from './repositories/playback-repository.service'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [BrowserModule, HttpClientModule, PlaybackPlayerModule],
  declarations: [AppComponent],
  providers: [{ provide: PLAYBACK_REPOSITORY_TOKEN, useClass: PlaybackRepositoryService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
