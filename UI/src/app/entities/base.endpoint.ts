import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseEndpoint<T> {
	public abstract endpoint?: string;

	constructor(protected httpClient: HttpClient) {	}

	public get(): Observable<T[]> {
		return this.httpClient.get<T[]>(environment.baseApi + this.endpoint);
	}

	public post(object: T): Observable<T> {
		return this.httpClient.post<T>(environment.baseApi + this.endpoint, object);
	}
}
