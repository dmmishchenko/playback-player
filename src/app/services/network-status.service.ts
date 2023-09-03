import { Injectable, OnDestroy } from '@angular/core'
import { Subject, fromEvent, map, merge, of, takeUntil } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class NetworkStatusService implements OnDestroy {
  private destroyed$ = new Subject<void>()
  private networkStatus$$ = merge(
    of(null),
    fromEvent(window, 'online'),
    fromEvent(window, 'offline')
  ).pipe(
    map(() => navigator.onLine),
    takeUntil(this.destroyed$)
  )

  getNetworkStatus$() {
    return this.networkStatus$$
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.complete()
  }
}
