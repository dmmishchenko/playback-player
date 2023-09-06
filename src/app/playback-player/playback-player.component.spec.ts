import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { SCREEN_KEY } from '../base/consts'
import { PlaybackRepositoryInterface } from '../base/interfaces/playback-repository.interface'
import { PLAYBACK_REPOSITORY_TOKEN } from '../base/tokens'
import { SCREEN_PLAYBACK_MOCK } from '../repositories/playback-repository.service'
import { ImageItemComponent } from './components/image-item/image-item.component'
import { VideoItemComponent } from './components/video-item/video-item.component'
import { PlaybackPlayerComponent } from './playback-player.component'
import { FilterByTypePipe } from './pipes/filter-by-type.pipe'

describe('PlaybackPlayerComponent', () => {
  let component: PlaybackPlayerComponent
  let fixture: ComponentFixture<PlaybackPlayerComponent>
  let playbackRepositoryMock: PlaybackRepositoryInterface
  const firstInMock = SCREEN_PLAYBACK_MOCK.playlists[0].playlistItems[0]

  beforeEach(() => {
    const mockResponse = SCREEN_PLAYBACK_MOCK
    playbackRepositoryMock = {
      getScreenPlayback: () => of(mockResponse),
      getMedia(creativeKey) {
        return `https://test.onsignage.com/PlayerBackend/creative/get/${creativeKey}`
      }
    }

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        PlaybackPlayerComponent,
        VideoItemComponent,
        ImageItemComponent,
        FilterByTypePipe
      ],
      providers: [{ provide: PLAYBACK_REPOSITORY_TOKEN, useValue: playbackRepositoryMock }]
    })

    fixture = TestBed.createComponent(PlaybackPlayerComponent)
    component = fixture.componentInstance
    component.screenKey = SCREEN_KEY
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should load playlists on initialization', (done: DoneFn) => {
    spyOn(playbackRepositoryMock, 'getScreenPlayback').and.callThrough()

    fixture.detectChanges()

    setTimeout(() => {
      expect(playbackRepositoryMock.getScreenPlayback).toHaveBeenCalledWith(component.screenKey)
      expect(component.screenPlaylists.length).toBeGreaterThan(0)
      done()
    }, 400)
  })

  it('should have same order', () => {
    fixture.detectChanges()
    const first = component.mediaItemsQuery?.first

    expect(first?.creativeKey).toEqual(firstInMock.creativeKey)
  })
})
