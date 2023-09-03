import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { PLAYBACK_REPOSITORY_TOKEN } from 'src/app/base/tokens'
import { PlaybackRepositoryService } from 'src/app/repositories/playback-repository.service'
import { ImageItemComponent } from './image-item.component'

describe('ImageItemComponent', () => {
  let component: ImageItemComponent
  let fixture: ComponentFixture<ImageItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ImageItemComponent],
      providers: [{ provide: PLAYBACK_REPOSITORY_TOKEN, useClass: PlaybackRepositoryService }]
    }).compileComponents()

    fixture = TestBed.createComponent(ImageItemComponent)
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
    component.creativeKey = '6daa1483-4fe0-4424-9d82-1ec1c3423a33.jpg'
    fixture.detectChanges()

    component.play().subscribe((status) => {
      expect(status).toBeFalse()
      done()
    })
  })

  it('Play should return true when isActive is true and creativeKey is set', (done: DoneFn) => {
    const onLoadSpy = spyOn(component, 'onLoad').and.callThrough()

    component.isActive = true
    component.creativeKey = '6daa1483-4fe0-4424-9d82-1ec1c3423a33.jpg'

    fixture.detectChanges()

    setTimeout(() => {
      expect(onLoadSpy).toHaveBeenCalled()

      component.play().subscribe((status) => {
        expect(status).toBeTrue()
        done()
      })
    }, 400)
  })
})
