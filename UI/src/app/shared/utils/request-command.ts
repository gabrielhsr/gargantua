import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, map, of, takeUntil } from 'rxjs';

export interface CommandResponse<T> {
    isSuccess: boolean;
    response: T;
    error?: string;
}

export interface OdataOperators {
    top?: number;
    count?: boolean;
    skip?: number;
}

export class QueryString {
    private parameters = new Map<string, string>();

    public buildUrl(baseUrl: string) {
        const hasParameter = this.parameters.size >= 1;

        return hasParameter ? `${baseUrl}?${this.buildQueryString()}` : baseUrl;
    }

    public addParam(parameter: string, value: string | boolean | number) {
        this.parameters.set(parameter, value.toString());
    }

    public setParams(params: OdataOperators) {
        if (params.top) {
            this.top(params.top);
        }

        if (params.count) {
            this.count();
        }

        if (params.skip) {
            this.top(params.skip);
        }
    }

    public count() {
        this.parameters.set('$count', 'true');
    }

    public top(value: number) {
        this.parameters.set('$top', value.toString());
    }

    public skip(value: number) {
        this.parameters.set('$skip', value.toString());
    }

    private buildQueryString() {
        let baseQuery = '';

        this.parameters.forEach((value, key) => {
            const isFirst = baseQuery === '';

            baseQuery += isFirst ? `${key}=${value}` : `&${key}=${value}`;
        });

        return baseQuery;
    }
}

export class QueryCommand<T> {
    public response$ = new Subject<CommandResponse<T>>();
    public isLoading$ = new BehaviorSubject<boolean>(false);

    public response = {} as CommandResponse<T>;
    public queryString = new QueryString();

    private readonly destroy$ = new Subject<void>();

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
                        response: value
                    };

                    return response;
                }),
                catchError((res: HttpErrorResponse) => {
                    const response: CommandResponse<T> = {
                        isSuccess: false,
                        error: res.message,
                        response: {} as T
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

    private handleResponse(response: CommandResponse<T>): void {
        this.isLoading$.next(false);
        this.response$.next(response);
    }
}