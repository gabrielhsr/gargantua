import { ArrayDataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { ODataResponse } from 'src/app/domain/base.model';
import { IQueryCommand, QueryCommand } from '../base/query-command';
import { CommandResponse } from '../common';
import { IODataQueryString, ODataQueryString } from './odata-query-string';

export interface IODataQueryCommand<T> extends IQueryCommand<ODataResponse<T>> {
    response$: Subject<CommandResponse<ODataResponse<T>>>;

    response: CommandResponse<ODataResponse<T>>;
    queryString: IODataQueryString;
}

export class OdataQueryCommand<T> extends QueryCommand<ODataResponse<T>> implements IODataQueryCommand<T> {
    private odataDataSource: ArrayDataSource<T> = new ArrayDataSource<T>([]);
    
    public override queryString = new ODataQueryString();

    constructor(private readonly requestOdata: (command: IODataQueryCommand<T>) => Observable<ODataResponse<T>>) {
        super(requestOdata as (command: IQueryCommand<ODataResponse<T>>) => Observable<ODataResponse<T>>);
    }

    public getOdataDataSource() {
        return this.odataDataSource;
    }
    
    protected override handleResponse(response: CommandResponse<ODataResponse<T>>): void {
        this.isLoading$.next(false);
        this.response$.next(response);

        if (!response.data) return;

        if (response.data.value instanceof Array) {
            this.odataDataSource = new ArrayDataSource(response.data.value as T[]);
        } else {
            this.odataDataSource = new ArrayDataSource([response.data.value]);
        }
    }
}