import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PlaybackPlayerComponent } from './playback-player.component'
import { VideoItemComponent } from './components/video-item/video-item.component'
import { ImageItemComponent } from './components/image-item/image-item.component'

@NgModule({
  imports: [CommonModule],
  declarations: [PlaybackPlayerComponent, VideoItemComponent, ImageItemComponent],
  exports: [PlaybackPlayerComponent, VideoItemComponent, ImageItemComponent]
})
export class PlaybackPlayerModule {}
