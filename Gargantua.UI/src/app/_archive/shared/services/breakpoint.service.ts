import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BreakpointService {
    public isMobile$ = new BehaviorSubject<boolean>(false);

    constructor(public breakpointObserver: BreakpointObserver) {
        this.breakpointObserver
            .observe([Breakpoints.Handset])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.isMobile$.next(true);
                } else {
                    this.isMobile$.next(false);
                }
            });
    }

    public get isMobile() {
        return this.isMobile$.value;
    }
}
