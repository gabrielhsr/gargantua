import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QueryString, RequestCommand } from '../shared/utils/request-command';
import { BaseEntity, Guid, OdataResponse } from './base.model';

const API_URL = 'api';
const ODATA_URL = 'odata';

export abstract class BaseEndpoint<TEntity extends BaseEntity> {
    private apiUrl = environment.baseApi;

    public abstract activator: TEntity;

    constructor(protected httpClient: HttpClient) {}

    public get entityName() {
        return this.activator.className;
    }

    public get(queryString: QueryString) {
        return this.httpClient.get<TEntity[]>(queryString.buildUrl(`${this.apiUrl}\\${API_URL}\\${this.entityName}`));
    }

    public getOdata(queryString: QueryString) {
        return this.httpClient.get<OdataResponse<TEntity>>(queryString.buildUrl(`${this.apiUrl}\\${ODATA_URL}\\${this.entityName}`));
    }

    public getById(queryString: QueryString, id: string): Observable<TEntity> {
        return this.httpClient.get<TEntity>(`${this.apiUrl}\\${this.entityName}\\${API_URL}\\${id}`);
    }

    public post(object: TEntity): Observable<TEntity> {
        return this.httpClient.post<TEntity>(`${this.apiUrl}\\${API_URL}\\${this.entityName}`, object);
    }

    public put(object: TEntity): Observable<TEntity> {
        return this.httpClient.put<TEntity>(`${this.apiUrl}\\${API_URL}\\${this.entityName}\\${object.id}`, object);
    }

    public delete(id: string): Observable<TEntity> {
        return this.httpClient.delete<TEntity>(`${this.apiUrl}\\${API_URL}\\${this.entityName}\\${id}`);
    }

    public getCommand(): RequestCommand<TEntity[]> {
        return new RequestCommand((command) => this.get(command.queryString));
    }

    public getOdataCommand(): RequestCommand<OdataResponse<TEntity>> {
        return new RequestCommand((command) => {
            command.queryString.setParams({ top: 15, count: true });

            return this.getOdata(command.queryString);
        });
    }

    public getByIdCommand(id: () => string): RequestCommand<TEntity> {
        const entityId = id();

        if (Guid.isNullOrDefault(entityId)) {
            throw new Error('Id cannot be null or default!');
        }

        return new RequestCommand((command) => this.getById(command.queryString, entityId));
    }

    public saveCommand(entity: () => TEntity): Observable<TEntity> {
        const obj = entity();

        return Guid.isNullOrDefault(obj.id) ? this.post(obj) : this.put(obj);
    }

    public deleteCommand(id: () => string): RequestCommand<TEntity> {
        const entityId = id();

        if (Guid.isNullOrDefault(entityId)) {
            throw new Error('Id cannot be null or default!');
        }

        return new RequestCommand(() => this.delete(entityId));
    }
}
