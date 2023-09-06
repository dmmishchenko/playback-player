import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core'
import { Subject, finalize, interval, take, takeUntil, withLatestFrom } from 'rxjs'
import { AssetUrl } from '../base/asset-url'
import { SCREEN_KEY, UPDATE_SCREEN_PLAYLIST_TIME_MS } from '../base/consts'
import {
  PlaybackRepositoryInterface,
  Playlist,
  PlaylistItem
} from '../base/interfaces/playback-repository.interface'
import { PLAYBACK_REPOSITORY_TOKEN } from '../base/tokens'
import { UniqueId } from '../base/unique-id'
import { NetworkStatusService } from '../services/network-status.service'
import { AbstractMediaFileComponent } from './components/media-item/media-item.component'
import { isImageType, isVideoType } from './helpers/media-type.helper'

@Component({
  selector: 'app-playback-player',
  templateUrl: './playback-player.component.html',
  styleUrls: ['./playback-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: []
})
export class PlaybackPlayerComponent implements OnInit, OnDestroy {
  @Input() screenKey: UniqueId = SCREEN_KEY
  @ViewChildren(AbstractMediaFileComponent)
  mediaItemsQuery: QueryList<AbstractMediaFileComponent> | null = null

  public screenPlaylists: Playlist[] = []
  public isInitialLoad = true
  public isPlaying = false
  public activeIndex = 0
  public fadeInOut = false

  private destroyed$ = new Subject<void>()
  private defferedPlaylists: Playlist[] = []

  constructor(
    @Inject(PLAYBACK_REPOSITORY_TOKEN)
    private readonly playbackRepository: PlaybackRepositoryInterface,
    private readonly cdr: ChangeDetectorRef,
    private readonly networkStatusService: NetworkStatusService
  ) {}

  ngOnInit(): void {
    if (this.screenKey) {
      this.playbackRepository
        .getScreenPlayback(this.screenKey)
        .pipe(
          finalize(() => {
            this.isInitialLoad = false
            this.cdr.markForCheck()
          })
        )
        .subscribe((res) => {
          this.screenPlaylists = res.playlists.filter((playlist) => playlist.playlistItems.length)
        })

      this.startUpdateTimer()
    } else {
      alert('Empty screen key!')
    }
  }

  public isImage(key: AssetUrl): boolean {
    return isImageType(key)
  }

  public isVideo(key: AssetUrl): boolean {
    return isVideoType(key)
  }

  public playSequence() {
    this.isPlaying = true
    this.mediaItemsQuery?.first.play().subscribe((status) => {
      if (!status) {
        this.handlePlayEnded(1)
      }
    })
  }

  public trackByFunc(_: number, item: PlaylistItem) {
    return item.creativeKey
  }

  public handlePlayEnded(index: number) {
    if (!this.fadeInOut) {
      this.fadeInOut = true
      this.cdr.markForCheck()
    }

    if (this.defferedPlaylists.length) {
      this.screenPlaylists = this.defferedPlaylists
      this.defferedPlaylists = []
      this.mediaItemsQuery?.changes.pipe(take(1)).subscribe(() => {
        this.handlePlayEnded(index)
      })
    } else {
      //play next
      let nextIndex = index + 1
      if (nextIndex === this.mediaItemsQuery?.length) {
        // start from first
        nextIndex = 0
      }

      const TIME_TO_PLAY_ASSET_MS = 2200
      setTimeout(() => {
        this.fadeInOut = false
        this.playItem(this.activeIndex)
      }, TIME_TO_PLAY_ASSET_MS)

      const TIME_TO_CHANGE_ITEM_MS = 1000
      setTimeout(() => {
        this.trySetPlayItem(nextIndex)
        this.cdr.markForCheck()
      }, TIME_TO_CHANGE_ITEM_MS)
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.complete()
  }

  private trySetPlayItem(index: number): void {
    if (!this.mediaItemsQuery) {
      return
    }
    const itemToPlay = this.mediaItemsQuery?.toArray().at(index)
    if (itemToPlay && itemToPlay.canPlay()) {
      this.activeIndex = index
    } else {
      const nextIndex = index + 1
      if (nextIndex === this.mediaItemsQuery?.length) {
        this.trySetPlayItem(0)
      }
      this.trySetPlayItem(nextIndex)
    }
  }

  private playItem(index: number) {
    const item = this.mediaItemsQuery?.toArray().at(index)
    if (item) {
      this.cdr.markForCheck()

      item.play().subscribe((status) => {
        if (!status) {
          this.handlePlayEnded(index)
        }
      })
    }
  }

  private startUpdateTimer(): void {
    interval(UPDATE_SCREEN_PLAYLIST_TIME_MS)
      .pipe(
        withLatestFrom(this.networkStatusService.getNetworkStatus$()),
        takeUntil(this.destroyed$)
      )
      .subscribe(([_, isOnline]) => {
        if (isOnline) {
          this.playbackRepository.getScreenPlayback(this.screenKey).subscribe((res) => {
            this.defferedPlaylists = res.playlists.filter(
              (playlist) => playlist.playlistItems.length
            )
          })
        }
      })
  }
}
