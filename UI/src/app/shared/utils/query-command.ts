import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, map, of, takeUntil } from 'rxjs';

const FILTER_KEY = '$filter';
const TOP_KEY = '$top';
const COUNT_KEY = '$count';
const SKIP_KEY = '$skip';

export interface ODataOperators {
    top?: number;
    count?: boolean;
    skip?: number;
    filter?: string;
}

export class CommandResponse<T> {
    public isSuccess: boolean = false;
    public data?: T;
    public error?: string;
}

export class QueryString {
    public value = '';

    private parameters = new Map<string, string>();

    public buildUrl(baseUrl: string) {
        const hasParameter = this.parameters.size >= 1;

        return hasParameter ? `${baseUrl}?${this.buildQueryString()}` : baseUrl;
    }

    public addParam(parameter: string, value: string | boolean | number) {
        this.parameters.set(parameter, value.toString());
    }

    public setParams(params: ODataOperators) {
        if (params.top) {
            this.top(params.top);
        }

        if (params.count) {
            this.count();
        }

        if (params.skip) {
            this.top(params.skip);
        }

        if (params.filter) {
            this.filter(params.filter);
        }
    }

    public count(value: boolean = true) {
        this.parameters.set(COUNT_KEY, value.toString());
    }

    public top(value: number) {
        if (value === undefined || value === null) {
            this.parameters.delete(TOP_KEY);
        } else {
            this.parameters.set(TOP_KEY, value.toString());
        }
    }

    public skip(value: number) {
        if (value) {
            this.parameters.set(SKIP_KEY, value.toString());
        } else {
            this.parameters.delete(SKIP_KEY);
        }
    }

    public filter(expression: string) {
        if (expression) {
            this.parameters.set(FILTER_KEY, expression);
        } else {
            this.parameters.delete(FILTER_KEY);
        }
    }

    private buildQueryString() {
        this.value = '';

        this.parameters.forEach((value, key) => {
            const isFirst = this.value === '';

            this.value += isFirst ? `${key}=${value}` : `&${key}=${value}`;
        });

        return this.value;
    }
}

export class QueryCommand<T> {
    public response$ = new Subject<CommandResponse<T>>();
    public isLoading$ = new BehaviorSubject<boolean>(false);

    public response = new CommandResponse<T>();
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
                        data: value
                    };

                    return response;
                }),
                catchError((res: HttpErrorResponse) => {
                    const response: CommandResponse<T> = {
                        isSuccess: false,
                        error: res.message,
                        data: {} as T
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