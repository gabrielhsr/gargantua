import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'page-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class HomePage implements OnDestroy {
    private destroy$ = new Subject<void>();

    public ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
