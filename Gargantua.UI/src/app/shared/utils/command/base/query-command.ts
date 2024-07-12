import { ArrayDataSource } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, map, of, takeUntil } from 'rxjs';
import { CommandResponse } from '../common';
import { IQueryString, QueryString } from './query-string';

export interface IQueryCommand<T> {
    response$: Subject<CommandResponse<T>>;
    isLoading$: BehaviorSubject<boolean>;

    response: CommandResponse<T>;
    queryString: IQueryString;

    isLoading: boolean;

    execute: () => void;
    destroy: () => void;

    getDataSource: () => ArrayDataSource<T>;
}

export class QueryCommand<T> implements IQueryCommand<T> {
    private readonly destroy$ = new Subject<void>();
    private dataSource: ArrayDataSource<T> = new ArrayDataSource<T>([]);

    public response$ = new Subject<CommandResponse<T>>();
    public isLoading$ = new BehaviorSubject<boolean>(false);

    public response = new CommandResponse<T>();
    public queryString: IQueryString = new QueryString();

    constructor(private readonly request: (command: IQueryCommand<T>) => Observable<T>) {}

    public get isLoading(): boolean {
        return this.isLoading$.value;
    }

    public execute(): void {
        this.isLoading$.next(true);

        this.request(this)
            .pipe(
                takeUntil(this.destroy$),
                map((value) => {
                    const response: CommandResponse<T> = {
                        isSuccess: true,
                        data: value
                    };

                    return response;
                }),
                catchError((res: HttpErrorResponse) => {
                    const response: CommandResponse<T> = {
                        isSuccess: false,
                        error: res.message
                    };

                    return of(response);
                })
            )
            .subscribe((response) => this.handleResponse(response));
    }

    public destroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public getDataSource() {
        return this.dataSource;
    }

    protected handleResponse(response: CommandResponse<T>): void {
        this.isLoading$.next(false);
        this.response$.next(response);
        this.response = response;

        if (!response.data) return;

        if (response.data instanceof Array) {
            this.dataSource = new ArrayDataSource(response.data as T[]);
        } else {
            this.dataSource = new ArrayDataSource([response.data]);
        }
    }
}