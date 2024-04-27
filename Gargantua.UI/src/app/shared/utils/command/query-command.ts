import { ArrayDataSource } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, map, of, takeUntil } from 'rxjs';
import { ODataQueryString } from './query-string';

export class CommandResponse<T> {
    public isSuccess: boolean = false;
    public data?: T;
    public error?: string;
}

export class QueryCommand<T> {
    private readonly destroy$ = new Subject<void>();

    public response$ = new Subject<CommandResponse<T>>();
    public isLoading$ = new BehaviorSubject<boolean>(false);

    public response = new CommandResponse<T>();
    public queryString = new ODataQueryString();
    public dataSource: ArrayDataSource<T> = new ArrayDataSource<T>([]);

    constructor(private readonly request: (command: QueryCommand<T>) => Observable<T>) {
        this.response$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => this.response = value);
    }

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

    public getDataSouce() {
        const data = this.response.data as readonly T[];

        return new ArrayDataSource(data);
    }

    private handleResponse(response: CommandResponse<T>): void {
        this.isLoading$.next(false);
        this.response$.next(response);

        if (!response.data) return;

        const data = response.data;

        if (typeof data === 'object' && 'value' in data) {
            this.dataSource = new ArrayDataSource(data.value as T[]);
        } else if (response.data instanceof Array) {
            this.dataSource = new ArrayDataSource(response.data as T[]);
        } else {
            this.dataSource = new ArrayDataSource([response.data]);
        }
    }
}