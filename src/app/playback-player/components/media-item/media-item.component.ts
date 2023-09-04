import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { AssetUrl } from 'src/app/base/asset-url'
import { PlaybackRepositoryInterface } from 'src/app/base/interfaces/playback-repository.interface'
import { PLAYBACK_REPOSITORY_TOKEN } from 'src/app/base/tokens'

@Component({ template: '' })
export abstract class AbstractMediaFileComponent implements OnInit {
  @Input() duration = 0
  @Input() creativeKey: AssetUrl = ''
  @Input() isActive = false
  @Input() index = 0
  @Output() playEnded = new EventEmitter<number>()

  public assetUrl = ''
  public currentTime = 0

  protected loaded = false

  constructor(
    @Inject(PLAYBACK_REPOSITORY_TOKEN)
    private readonly playbackRepository: PlaybackRepositoryInterface
  ) {}

  ngOnInit(): void {
    this.assetUrl = this.playbackRepository.getMedia(this.creativeKey)
  }

  abstract play(): Observable<boolean>

  public canPlay(): boolean {
    return this.loaded && !!this.duration
  }
}
