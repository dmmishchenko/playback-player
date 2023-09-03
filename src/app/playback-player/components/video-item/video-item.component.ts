import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild
} from '@angular/core'
import { AbstractMediaFileComponent } from '../media-item/media-item.component'
import { Observable, from, of, tap } from 'rxjs'
import { PlaybackRepositoryInterface } from 'src/app/base/interfaces/playback-repository.interface'
import { PLAYBACK_REPOSITORY_TOKEN } from 'src/app/base/tokens'

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['../media-item/media-item.component.scss', './video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: AbstractMediaFileComponent, useExisting: VideoItemComponent }]
})
export class VideoItemComponent extends AbstractMediaFileComponent implements OnDestroy {
  @ViewChild('videoRef') videoRef: ElementRef<HTMLVideoElement> | null = null

  timer = 0

  constructor(
    @Inject(PLAYBACK_REPOSITORY_TOKEN)
    private readonly _playbackRepository: PlaybackRepositoryInterface,
    private readonly cdr: ChangeDetectorRef
  ) {
    super(_playbackRepository)
  }

  override play(): Observable<boolean> {
    if (this.canPlay()) {
      const video = this.videoRef?.nativeElement

      if (video) {
        const play$ = from(
          video
            .play()
            .then(() => true)
            .catch(() => false)
        )

        return play$.pipe(
          tap((status) => {
            this.startVideoTimer(status, video)
          })
        )
      }
    }

    return of(this.canPlay())
  }

  public onLoad() {
    this.loaded = true
  }

  public onEnded() {
    if (this.isActive && this.videoRef?.nativeElement) {
      this.emitEnded(this.videoRef.nativeElement)
    }
  }

  ngOnDestroy(): void {
    if (this.timer) {
      window.clearInterval(this.timer)
    }
  }

  private startVideoTimer(status: boolean, video: HTMLVideoElement): void {
    if (status) {
      this.timer = window.setInterval(() => {
        this.currentTime++
        this.cdr.markForCheck()

        if (this.currentTime === this.duration) {
          this.emitEnded(video)
        }
      }, 1000)
    }
  }

  private emitEnded(video: HTMLVideoElement) {
    window.clearInterval(this.timer)
    this.playEnded.emit(this.index)
    this.currentTime = 0

    video.pause()
    video.currentTime = 0
  }
}
