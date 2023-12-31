import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  PlaybackRepositoryInterface,
  ScreenPlayback
} from '../base/interfaces/playback-repository.interface'

@Injectable()
export class PlaybackRepositoryService implements PlaybackRepositoryInterface {
  constructor(private httpClient: HttpClient) {}

  public getMedia(creativeKey: string): string {
    return `/PlayerBackend/creative/get/${creativeKey}`
  }

  public getScreenPlayback(screenKey: string): Observable<ScreenPlayback> {
    const url = `/PlayerBackend/screen/playlistItems/${screenKey}`

    return this.httpClient.get<ScreenPlayback>(url)
  }
}

export const SCREEN_PLAYBACK_MOCK = {
  screenKey: '294d453d-9176-44c2-9db9-f2759031e8e4',
  breakpointInterval: 0,
  playlists: [
    {
      channelTime: 0,
      playlistItems: [
        {
          duration: 3,
          creativeKey: '6daa1483-4fe0-4424-9d82-1ec1c3423a33.jpg'
        },
        {
          duration: 4,
          creativeKey: 'b1f1b49b-46b8-49ef-8177-309d28128bf7.jpg'
        },
        {
          duration: 5,
          creativeKey:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        }
      ]
    }
  ]
}
