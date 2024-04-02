import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestCommand } from '../shared/utils/request-command';
import { BaseEntity, Guid, OdataResponse } from './base.model';

export abstract class BaseEndpoint<TEntity extends BaseEntity> {
    private apiUrl = environment.baseApi;

    public abstract activator: TEntity;

    constructor(protected httpClient: HttpClient) {}

    public get entityName() {
        return this.activator.className;
    }

    public get() {
        return this.httpClient.get<TEntity[]>(`${this.apiUrl}\\api\\${this.entityName}`);
    }

    public getOdata() {
        return this.httpClient.get<OdataResponse<TEntity>>(`${this.apiUrl}\\odata\\${this.entityName}`);
    }

    public getById(id: string): Observable<TEntity> {
        return this.httpClient.get<TEntity>(`${this.apiUrl}\\${this.entityName}\\api\\${id}`);
    }

    public post(object: TEntity): Observable<TEntity> {
        return this.httpClient.post<TEntity>(`${this.apiUrl}\\api\\${this.entityName}`, object);
    }

    public put(object: TEntity): Observable<TEntity> {
        return this.httpClient.put<TEntity>(`${this.apiUrl}\\api\\${this.entityName}\\${object.id}`, object);
    }

    public delete(id: string): Observable<TEntity> {
        return this.httpClient.delete<TEntity>(`${this.apiUrl}\\api\\${this.entityName}\\${id}`);
    }

    public getCommand(): RequestCommand<TEntity[]> {
        return new RequestCommand(() => this.get());
    }

    public getODataCommand(): RequestCommand<OdataResponse<TEntity>> {
        return new RequestCommand(() => this.getOdata());
    }

    public getByIdCommand(id: () => string): RequestCommand<TEntity> {
        const entityId = id();
        const endpoint = Guid.isNullOrDefault(entityId) ? of(this.activator) : this.getById(entityId);

        return new RequestCommand(() => endpoint);
    }

    public saveCommand(entity: () => TEntity): Observable<TEntity> {
        const obj = entity();

        return Guid.isNullOrDefault(obj.id) ? this.post(obj) : this.put(obj);
    }

    public deleteCommand(id: () => string): RequestCommand<TEntity> {
        const entityId = id();
        const endpoint = Guid.isNullOrDefault(entityId) ? of(this.activator) : this.delete(entityId);

        return new RequestCommand(() => endpoint);
    }
}
