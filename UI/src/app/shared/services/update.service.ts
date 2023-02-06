import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, switchMap } from 'rxjs';
import { HttpHandleResponse } from './http.service';

@Injectable({
	providedIn: 'root',
})
export class UpdateService {
	private subject = new BehaviorSubject<void>(undefined);

	public run() {
		console.log('run updated called');

		this.subject.next();
	}

	public handle<T>(getMethod: Observable<HttpHandleResponse<T>>, source: string) {
		return this.subject.pipe(shareReplay(1), switchMap(() => {
			console.log('handle called and returned method', source);

			return getMethod;
		}));
	}
}
