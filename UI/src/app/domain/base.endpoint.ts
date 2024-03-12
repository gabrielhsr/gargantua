import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestCommand } from '../shared/utils/request-command';
import { BaseEntity, Guid } from './base.model';

export abstract class BaseEndpoint<T extends BaseEntity> {
    private apiUrl = environment.baseApi;

    public abstract activator: T;

    constructor(protected httpClient: HttpClient, public readonly url: string) {}

    public get(): Observable<T[]> {
        return this.httpClient.get<T[]>(`${this.apiUrl}\\${this.url}?$count=true&filter=name eq 'Teste'`);
    }

    public getById(id: string): Observable<T> {
        return this.httpClient.get<T>(`${this.apiUrl}\\${this.url}\\${id}`);
    }

    public post(object: T): Observable<T> {
        return this.httpClient.post<T>(`${this.apiUrl}\\${this.url}`, object);
    }

    public put(object: T): Observable<T> {
        return this.httpClient.put<T>(`${this.apiUrl}\\${this.url}\\${object.id}`, object);
    }

    public delete(id: string): Observable<T> {
        return this.httpClient.delete<T>(`${this.apiUrl}\\${this.url}\\${id}`);
    }

    public getCommand(): RequestCommand<T[]> {
        return new RequestCommand(() => this.get());
    }

    public getByIdCommand(id: () => string): RequestCommand<T> {
        const entityId = id();
        const endpoint = Guid.isNullOrDefault(entityId) ? of(this.activator) : this.getById(entityId);

        return new RequestCommand(() => endpoint);
    }

    public saveCommand(entity: () => T): Observable<T> {
        const obj = entity();

        return Guid.isNullOrDefault(obj.id) ? this.post(obj) : this.put(obj);
    }

    public deleteCommand(id: () => string): RequestCommand<T> {
        const entityId = id();
        const endpoint = Guid.isNullOrDefault(entityId) ? of(this.activator) : this.delete(entityId);

        return new RequestCommand(() => endpoint);
    }
}
