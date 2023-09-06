import { TestBed } from '@angular/core/testing'
import { PlaylistItem } from 'src/app/base/interfaces/playback-repository.interface'
import { FilterByTypePipe } from './filter-by-type.pipe'

describe('FilterByTypePipe', () => {
  let pipe: FilterByTypePipe

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterByTypePipe]
    })

    pipe = TestBed.inject(FilterByTypePipe)
  })

  it('should create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should filter an array of PlaylistItems by image and video types', () => {
    const input: PlaylistItem[] = [
      { creativeKey: 'image.jpg', duration: 5 },
      { creativeKey: 'video.mp4', duration: 10 },
      { creativeKey: 'audio.mp3', duration: 2 }
    ]

    const result = pipe.transform(input)

    expect(result.length).toBe(2)
    expect(result).toContain(input[0]) // Image should be included
    expect(result).toContain(input[1]) // Video should be included
    expect(result).not.toContain(input[2]) // Audio should be excluded
  })
})
