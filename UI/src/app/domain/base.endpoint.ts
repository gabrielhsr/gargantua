import { HttpService } from '../shared/services/http.service';

export abstract class BaseEndpoint<T> {
	constructor(protected httpService: HttpService, public readonly url: string) {}

	public get() {
		return this.httpService.get<T[]>(this.url);
	}

	public post(object: T) {
		return this.httpService.post<T, T>(this.url, object);
	}

	public put(object: T, id: string) {
		return this.httpService.put<T, T>(this.url, object, id);
	}

	public delete(id: string) {
		return this.httpService.delete<T>(this.url, id);
	}
}
