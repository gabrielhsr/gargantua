import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { FeedbackService } from './feedback.service';

type HttpHandleResponse<T> = ErrorHandleResponse | SuccessHandleResponse<T>

interface ErrorHandleResponse {
	isSuccess: false;
	error: string;
}

interface SuccessHandleResponse<T> {
	isSuccess: true;
	value: T;
}

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	constructor(private readonly feedback: FeedbackService) {}

	public handle<T>(observable: Observable<T>) {
		return observable.pipe(
			map((value) => {
				const response: HttpHandleResponse<T> = {
					isSuccess: true,
					value: value,
				};

				return response;
			}),
			catchError((error: HttpErrorResponse) => {
				const response: HttpHandleResponse<T> = {
					isSuccess: false,
					error: error.message
				};

				this.feedback.errorToast(error.message);

				return of(response);
			})
		);
	}
}
