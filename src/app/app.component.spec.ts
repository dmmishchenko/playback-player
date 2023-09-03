import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { CommonModule } from '@angular/common'
import { PlaybackPlayerModule } from './playback-player/playback-player.module'
import { PLAYBACK_REPOSITORY_TOKEN } from './base/tokens'
import { PlaybackRepositoryService } from './repositories/playback-repository.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, PlaybackPlayerModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: PLAYBACK_REPOSITORY_TOKEN, useClass: PlaybackRepositoryService }]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'playback-player'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('playback-player')
  })
})
