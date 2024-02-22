import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

export abstract class BaseEndpoint<T> {
	public apiUrl = environment.baseApi;

	constructor(protected httpClient: HttpClient, public readonly url: string) {}

	public get() {
		return this.httpClient.get<T[]>(this.url);
	}

	public post(object: T) {
		return this.httpClient.post<T, T>(this.url, object);
	}

	public put(object: T, id: string) {
		return this.httpClient.put<T, T>(this.url, object, id);
	}

	public delete(id: string) {
		return this.httpClient.delete<T>(this.url, id);
	}
}
