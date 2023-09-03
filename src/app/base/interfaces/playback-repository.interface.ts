import { Observable } from 'rxjs'
import { UniqueId } from '../unique-id'
import { AssetUrl } from '../asset-url'

export interface PlaybackRepositoryInterface {
  getScreenPlayback(screenKey: UniqueId): Observable<ScreenPlayback>
  getMedia(creativeKey: AssetUrl): string
}

export interface ScreenPlayback {
  screenKey: UniqueId
  breakpointInterval: number
  playlists: Playlist[]
}

export interface Playlist {
  channelTime: number
  playlistItems: PlaylistItem[]

  isActive?: boolean
}

export interface PlaylistItem {
  duration: number
  creativeKey: AssetUrl
}
