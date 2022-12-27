import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpService } from '../shared/services/http.service';

export abstract class BaseEndpoint<T> {
	public abstract endpoint?: string;

	constructor(protected httpClient: HttpClient, protected httpService: HttpService) {	}

	public get() {
		return this.httpService.handle(this.httpClient.get<T[]>(environment.baseApi + this.endpoint));
	}

	public post(object: T) {
		return this.httpService.handle(this.httpClient.post<T>(environment.baseApi + this.endpoint, object));
	}

	public delete(id: string) {
		return this.httpService.handle(this.httpClient.delete<T>(environment.baseApi + this.endpoint + id))
	}
}
