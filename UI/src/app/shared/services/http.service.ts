import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeedbackService } from './feedback.service';

export type HttpHandleResponse<T> = ErrorHandleResponse | SuccessHandleResponse<T>

export type Params = HttpParams | {	[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };

interface ErrorHandleResponse {
	isSuccess: false;
	error: string;
	type: 'entityInUse' | 'generic'
}

interface SuccessHandleResponse<T> {
	isSuccess: true;
	value: T;
}

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	constructor(
		private readonly feedback: FeedbackService,
		private readonly httpClient: HttpClient,
		private readonly router: Router
	) {}

	public get<T>(endpoint: string, params?: Params) {
		return this.intercept(this.httpClient.get<T>(environment.baseApi + endpoint, { params }));
	}

	public post<TBody, TReturn>(endpoint: string, object: TBody) {
		return this.intercept(this.httpClient.post<TReturn>(environment.baseApi + endpoint, object));
	}

	public put<TBody, TReturn>(endpoint: string, object: TBody, id: string) {
		return this.intercept(this.httpClient.put<TReturn>(environment.baseApi + endpoint + id, object));
	}

	public delete<T>(endpoint: string, id: string) {
		return this.intercept(this.httpClient.delete<T>(environment.baseApi + endpoint + id))
	}

	private intercept<T>(observable: Observable<T>): Observable<HttpHandleResponse<T>> {
		return observable.pipe(
			map((value) => {
				const response: HttpHandleResponse<T> = {
					isSuccess: true,
					value: value,
				};

				return response;
			}),
			catchError((res: HttpErrorResponse) => {
				const response: HttpHandleResponse<T> = {
					isSuccess: false,
					error: res.message,
					type: 'generic'
				};

				const isMessage = typeof res.error === 'string';

				console.log(res);

				if (isMessage && res.error.includes('DELETE statement conflicted with the REFERENCE constraint')) {
					response.type = 'entityInUse';
				} else if (res.status === 401) {
					this.router.navigate(['login']);
				} else {
					this.feedback.toast(res.message);
				}

				return of(response);
			})
		);
	}
}
