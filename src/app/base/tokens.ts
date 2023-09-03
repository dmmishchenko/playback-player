import { InjectionToken } from '@angular/core'
import { PlaybackRepositoryInterface } from './interfaces/playback-repository.interface'

export const PLAYBACK_REPOSITORY_TOKEN = new InjectionToken<PlaybackRepositoryInterface>(
  'PlaybackRepositoryInterface'
)
