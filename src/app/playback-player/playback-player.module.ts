import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ImageItemComponent } from './components/image-item/image-item.component'
import { VideoItemComponent } from './components/video-item/video-item.component'
import { PlaybackPlayerComponent } from './playback-player.component'

@NgModule({
  imports: [CommonModule],
  declarations: [PlaybackPlayerComponent, VideoItemComponent, ImageItemComponent],
  exports: [PlaybackPlayerComponent, VideoItemComponent, ImageItemComponent]
})
export class PlaybackPlayerModule {}
