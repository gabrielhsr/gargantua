import { ArrayDataSource } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, map, of, takeUntil } from 'rxjs';
import { ODataResponse } from 'src/app/domain/base.model';
import { ODataQueryString } from './query-string';

export class CommandResponse<T> {
    public isSuccess: boolean = false;
    public data?: T;
    public error?: string;
}

export class OdataQueryCommand<T> {
    private readonly destroy$ = new Subject<void>();

    public response$ = new Subject<CommandResponse<ODataResponse<T>>>();
    public isLoading$ = new BehaviorSubject<boolean>(false);

    public response = new CommandResponse<ODataResponse<T>>();
    public queryString = new ODataQueryString();
    public dataSource: ArrayDataSource<T> = new ArrayDataSource<T>([]);

    constructor(private readonly request: (command: OdataQueryCommand<T>) => Observable<ODataResponse<T>>) {
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
                    const response: CommandResponse<ODataResponse<T>> = {
                        isSuccess: true,
                        data: value
                    };

                    return response;
                }),
                catchError((res: HttpErrorResponse) => {
                    const response: CommandResponse<ODataResponse<T>> = {
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
        const data = this.response.data?.value as readonly T[];

        return new ArrayDataSource(data);
    }

    private handleResponse(response: CommandResponse<ODataResponse<T>>): void {
        this.isLoading$.next(false);
        this.response$.next(response);

        if (!response.data) return;

        if (response.data.value instanceof Array) {
            this.dataSource = new ArrayDataSource(response.data.value as T[]);
        } else {
            this.dataSource = new ArrayDataSource([response.data.value]);
        }
    }
}