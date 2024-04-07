import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { CommandResponse } from '../utils/query-command';

@Injectable({
    providedIn: 'root'
})
export class RefreshService {
    private subject = new BehaviorSubject<void>(undefined);

    public execute(): void {
        this.subject.next();
    }

    public handle<T>(getMethod: Observable<CommandResponse<T>>): Observable<CommandResponse<T>> {
        return this.subject.pipe(switchMap(() => getMethod));
    }
}
