import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QueryCommand, QueryString } from '../shared/utils/query-command';
import { BaseEntity, Guid, ODataResponse } from './base.model';

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

    public getOData(queryString: QueryString) {
        return this.httpClient.get<ODataResponse<TEntity>>(queryString.buildUrl(`${this.apiUrl}\\${ODATA_URL}\\${this.entityName}`));
    }

    public getById(queryString: QueryString, id: string): Observable<TEntity> {
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

    public getODataCommand(): QueryCommand<ODataResponse<TEntity>> {
        return new QueryCommand((command) => {
            command.queryString.setParams({ top: 15, count: true });

            return this.getOData(command.queryString);
        });
    }

    public getByIdCommand(id: () => string): QueryCommand<TEntity> {
        const entityId = id();

        if (Guid.isNullOrDefault(entityId)) {
            throw new Error('Id cannot be null or default!');
        }

        return new QueryCommand((command) => this.getById(command.queryString, entityId));
    }

    public saveCommand(entity: () => TEntity): QueryCommand<TEntity> {
        const postCommand = new QueryCommand(() => this.post(entity()));
        const putCommand = new QueryCommand(() => this.put(entity()));

        return Guid.isNullOrDefault(entity().Id) ? postCommand : putCommand;
    }

    public deleteCommand(id: () => string): QueryCommand<TEntity> {
        const entityId = id();

        if (Guid.isNullOrDefault(entityId)) {
            throw new Error('Id cannot be null or default!');
        }

        return new QueryCommand(() => this.delete(entityId));
    }
}
