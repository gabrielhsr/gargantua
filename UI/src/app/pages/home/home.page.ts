import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
	selector: 'page-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss']
})
export class HomePage implements OnDestroy {
	private destroy$ = new Subject<void>();

	public ngOnDestroy(): void {
		this.destroy$.next();
        this.destroy$.complete();
	}
}
