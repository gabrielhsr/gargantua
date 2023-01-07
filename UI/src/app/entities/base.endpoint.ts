import { HttpService } from '../shared/services/http.service';

export abstract class BaseEndpoint<T> {
	public abstract url: string;

	constructor(protected httpService: HttpService) {}

	public get() {
		return this.httpService.get<T[]>(this.url);
	}

	public post(object: T) {
		return this.httpService.post<T>(this.url, object);
	}

	public put(object: T, id: string) {
		return this.httpService.put<T>(this.url, object, id);
	}

	public delete(id: string) {
		return this.httpService.delete<T>(this.url, id);
	}
}
