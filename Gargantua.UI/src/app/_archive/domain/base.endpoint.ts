import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QueryCommand } from '../shared/utils/command/base/query-command';
import { IQueryString } from '../shared/utils/command/base/query-string';
import { OdataQueryCommand } from '../shared/utils/command/odata/odata-query-command';
import { ODataOptions } from '../shared/utils/command/odata/odata-query-string';
import { BaseEntity, Guid, ODataResponse } from './base.model';

const API_URL = 'api';
const ODATA_URL = 'odata';

export abstract class BaseEndpoint<TEntity extends BaseEntity> {
    private readonly httpClient = inject(HttpClient);
    private apiUrl = environment.baseApi;

    public abstract activator: TEntity;

    public get entityName() {
        return this.activator.className;
    }

    public get(queryString: IQueryString) {
        return this.httpClient.get<TEntity[]>(queryString.buildUrl(`${this.apiUrl}\\${API_URL}\\${this.entityName}`));
    }

    public getOData(queryString: IQueryString) {
        return this.httpClient.get<ODataResponse<TEntity>>(queryString.buildUrl(`${this.apiUrl}\\${ODATA_URL}\\${this.entityName}`));
    }

    public getById(queryString: IQueryString, id: string): Observable<TEntity> {
        return this.httpClient.get<TEntity>(`${this.apiUrl}\\${this.entityName}\\${API_URL}\\${id}`);
    }

    public post(object: TEntity): Observable<TEntity> {
        return this.httpClient.post<TEntity>(`${this.apiUrl}\\${API_URL}\\${this.entityName}`, object);
    }

    public put(object: TEntity): Observable<TEntity> {
        return this.httpClient.put<TEntity>(`${this.apiUrl}\\${API_URL}\\${this.entityName}\\${object.Id}`, object);
    }

    public delete(id: string): Observable<TEntity> {
        return this.httpClient.delete<TEntity>(`${this.apiUrl}\\${API_URL}\\${this.entityName}\\${id}`);
    }

    public getCommand(): QueryCommand<TEntity[]> {
        return new QueryCommand((command) => this.get(command.queryString));
    }

    public getODataCommand(options?: ODataOptions) {
        return new OdataQueryCommand<TEntity>((command) => {
            const defaultOperators = { top: 15, count: true };

            command.queryString.setParams(options ?? defaultOperators);

            return this.getOData(command.queryString);
        });
    }

    public getByIdCommand(id: () => string): QueryCommand<TEntity> {
        return new QueryCommand((command) => {
            const entityId = id();

            if (Guid.isNullOrDefault(entityId)) {
                throw new Error('Id cannot be null or default!');
            }

            return this.getById(command.queryString, entityId);
        });
    }

    public saveCommand(entity: () => TEntity): QueryCommand<TEntity> {
        return new QueryCommand(() => {
            const entityObj = entity();

            return Guid.isNullOrDefault(entityObj.Id) ? this.post(entityObj) : this.put(entityObj);
        });
    }

    public deleteCommand(id: () => string): QueryCommand<TEntity> {
        return new QueryCommand(() => {
            const entityId = id();

            if (Guid.isNullOrDefault(entityId)) {
                throw new Error('Id cannot be null or default!');
            }

            return this.delete(entityId);
        });
    }
}
