import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy
} from '@angular/core'
import { AbstractMediaFileComponent } from '../media-item/media-item.component'
import { PlaybackRepositoryInterface } from 'src/app/base/interfaces/playback-repository.interface'
import { PLAYBACK_REPOSITORY_TOKEN } from 'src/app/base/tokens'
import { Observable, of } from 'rxjs'

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['../media-item/media-item.component.scss', './image-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: AbstractMediaFileComponent, useExisting: ImageItemComponent }]
})
export class ImageItemComponent extends AbstractMediaFileComponent implements OnDestroy {
  private timer = 0

  constructor(
    @Inject(PLAYBACK_REPOSITORY_TOKEN)
    private readonly _playbackRepository: PlaybackRepositoryInterface,
    private readonly cdr: ChangeDetectorRef
  ) {
    super(_playbackRepository)
  }

  override play(): Observable<boolean> {
    if (this.canPlay() && this.isActive) {
      this.timer = window.setInterval(() => {
        this.currentTime++
        this.cdr.markForCheck()

        if (this.currentTime === this.duration) {
          window.clearInterval(this.timer)
          this.playEnded.emit(this.index)
          this.currentTime = 0
        }
      }, 1000)
    }

    return of(this.canPlay() && this.isActive)
  }

  public onLoad() {
    this.loaded = true
  }

  ngOnDestroy(): void {
    if (this.timer) {
      window.clearInterval(this.timer)
    }
  }
}
