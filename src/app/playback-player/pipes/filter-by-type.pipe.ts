import { Pipe, PipeTransform } from '@angular/core'
import { PlaylistItem } from 'src/app/base/interfaces/playback-repository.interface'
import { isImageType, isVideoType } from '../helpers/media-type.helper'

@Pipe({
  name: 'filterByType',
  pure: false
})
export class FilterByTypePipe implements PipeTransform {
  transform(array: PlaylistItem[]): PlaylistItem[] {
    return array.filter((item) => {
      return isImageType(item.creativeKey) || isVideoType(item.creativeKey)
    })
  }
}
