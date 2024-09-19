import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-base',
    standalone: true,
    imports: [CommonModule],
    template: ''
})
export class Base implements OnDestroy {
    protected readonly destroy$ = new Subject<void>();

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
