import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core'
import { finalize } from 'rxjs'
import { AssetUrl } from '../base/asset-url'
import { SCREEN_KEY } from '../base/consts'
import {
  PlaybackRepositoryInterface,
  Playlist,
  PlaylistItem
} from '../base/interfaces/playback-repository.interface'
import { PlaylistItemTypes } from '../base/models/playlist-item-types'
import { PLAYBACK_REPOSITORY_TOKEN } from '../base/tokens'
import { UniqueId } from '../base/unique-id'
import { AbstractMediaFileComponent } from './components/media-item/media-item.component'

@Component({
  selector: 'app-playback-player',
  templateUrl: './playback-player.component.html',
  styleUrls: ['./playback-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaybackPlayerComponent implements OnInit {
  @Input() screenKey: UniqueId = SCREEN_KEY
  @ViewChildren(AbstractMediaFileComponent)
  mediaItemsQuery: QueryList<AbstractMediaFileComponent> | null = null

  public screenPlaylists: Playlist[] = []
  public isInitialLoad = true
  public activeKey: AssetUrl = ''
  public isPlaying = false

  constructor(
    @Inject(PLAYBACK_REPOSITORY_TOKEN)
    private readonly playbackRepository: PlaybackRepositoryInterface
  ) {}

  ngOnInit(): void {
    if (this.screenKey) {
      this.playbackRepository
        .getScreenPlayback(this.screenKey)
        .pipe(
          finalize(() => {
            this.isInitialLoad = false
          })
        )
        .subscribe((res) => {
          this.screenPlaylists = res.playlists.filter((playlist) => playlist.playlistItems.length)
          this.activeKey = this.screenPlaylists[0]?.playlistItems[0]?.creativeKey
        })
    } else {
      alert('Empty screen key!')
    }
  }

  public isImage(key: AssetUrl): boolean {
    return PlaylistItemTypes.imageTypes.some((imageType) => {
      return key.endsWith(imageType)
    })
  }

  public isVideo(key: AssetUrl): boolean {
    return PlaylistItemTypes.videoTypes.some((videoType) => {
      return key.endsWith(videoType)
    })
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
    //show cross fade animation

    //play next
    const nextIndex = index + 1
    if (nextIndex === this.mediaItemsQuery?.length) {
      // start from first
      this.playItem(0)
    }
    this.playItem(nextIndex)
  }

  private playItem(index: number) {
    const item = this.mediaItemsQuery?.toArray().at(index)
    if (item) {
      this.activeKey = item.creativeKey
      item.play().subscribe((status) => {
        if (!status) {
          this.handlePlayEnded(index)
        }
      })
    }
  }
}
