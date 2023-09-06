import { AssetUrl } from 'src/app/base/asset-url'
import { PlaylistItemTypes } from 'src/app/playback-player/helpers/playlist-item-types'

export function isImageType(key: AssetUrl): boolean {
  return PlaylistItemTypes.imageTypes.some((imageType) => {
    return key.endsWith(imageType)
  })
}

export function isVideoType(key: AssetUrl): boolean {
  return PlaylistItemTypes.videoTypes.some((videoType) => {
    return key.endsWith(videoType)
  })
}
