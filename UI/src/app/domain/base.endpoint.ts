import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { environment } from "src/environments/environment";
import { RequestCommand } from "../shared/utils/request-command";
import { BaseEntity, Guid } from "./base.model";

export abstract class BaseEndpoint<T extends BaseEntity> {
	private apiUrl = environment.baseApi;

	public abstract activator: T;

	constructor(protected httpClient: HttpClient, public readonly url: string) {}

	public get() {
		return this.httpClient.get<T[]>(`${this.apiUrl}\\${this.url}`);
	}

	public getById(id: string) {
		return this.httpClient.get<T>(`${this.apiUrl}\\${this.url}\\${id}`);
	}

	public post(object: T) {
		return this.httpClient.post<T>(`${this.apiUrl}\\${this.url}`, object);
	}

	public put(object: T) {
		return this.httpClient.put<T>(`${this.apiUrl}\\${this.url}\\${object.id}`, object);
	}

	public delete(id: string) {
		return this.httpClient.delete<T>(`${this.apiUrl}\\${this.url}\\${id}`);
	}

	public getCommand() {
		return new RequestCommand(() => this.get());
	}

	public getByIdCommand(id: () => string) {
		const entityId = id();
		const endpoint = this.isDefaultId(entityId) ? of(this.activator) : this.getById(entityId);

		return new RequestCommand(() => endpoint);
	}

	public saveCommand(entity: () => T) {
		const obj = entity();

		return this.isDefaultId(obj.id) ? this.post(obj) : this.put(obj);
	}

	public deleteCommand(id: () => string) {
		const entityId = id();
		const endpoint = this.isDefaultId(entityId) ? of(this.activator) : this.delete(entityId);

		return new RequestCommand(() => endpoint);
	}

	private isDefaultId(id: string) {
		return id === Guid.default;
	}
}
