import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({})
export class SubscribedComponent implements OnDestroy {
    protected readonly componentDestroyed$ = new Subject<void>();

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
}
