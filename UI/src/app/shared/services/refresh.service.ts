import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HttpHandleResponse } from './http.service';

@Injectable({
	providedIn: 'root',
})
export class RefreshService {
	private subject = new BehaviorSubject<void>(undefined);

	public execute() {
		this.subject.next();
	}

	public handle<T>(getMethod: Observable<HttpHandleResponse<T>>) {
		return this.subject.pipe(switchMap(() => getMethod));
	}
}
