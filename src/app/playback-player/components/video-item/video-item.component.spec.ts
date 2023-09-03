import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PLAYBACK_REPOSITORY_TOKEN } from 'src/app/base/tokens'
import { PlaybackRepositoryService } from 'src/app/repositories/playback-repository.service'
import { VideoItemComponent } from './video-item.component'

describe('VideoItemComponent', () => {
  let component: VideoItemComponent
  let fixture: ComponentFixture<VideoItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [VideoItemComponent],
      providers: [{ provide: PLAYBACK_REPOSITORY_TOKEN, useClass: PlaybackRepositoryService }]
    }).compileComponents()

    fixture = TestBed.createComponent(VideoItemComponent)
    component = fixture.componentInstance

    component.duration = 5
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Play should return false when creativeKey is empty', (done: DoneFn) => {
    component.creativeKey = ''

    fixture.detectChanges()

    component.play().subscribe((status) => {
      expect(status).toBeFalse()
      done()
    })
  })

  it('Play should return false when isActive is false', (done: DoneFn) => {
    component.creativeKey =
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    fixture.detectChanges()

    component.play().subscribe((status) => {
      expect(status).toBeFalse()
      done()
    })
  })
})
