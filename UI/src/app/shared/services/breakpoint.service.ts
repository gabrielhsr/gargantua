import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class BreakpointService {
	public isMobile: boolean = true;

	constructor(public breakpointObserver: BreakpointObserver) {
		this.breakpointObserver
			.observe([Breakpoints.Handset])
			.subscribe((state: BreakpointState) => {
				if (state.matches) {
					this.isMobile = true;
				} else {
					this.isMobile = false;
				}
			});
	}
}
