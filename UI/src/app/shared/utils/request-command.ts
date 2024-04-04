import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, map, of, takeUntil } from 'rxjs';

export interface CommandResponse<T> {
    isSuccess: boolean;
    value: T;
    error?: string;
}

export class QueryString {
    private parameters = new Map<string, string>();

    public buildUrl(baseUrl: string) {
        return baseUrl;
    }

    public addParam(parameter: string, value: string) {
        this.parameters.set(parameter, value);
    }
}

export class RequestCommand<T> {
    public response$ = new Subject<CommandResponse<T>>();
    public isLoading$ = new BehaviorSubject<boolean>(false);

    public response = {} as CommandResponse<T>;
    public queryString = new QueryString();

    private readonly destroy$ = new Subject<void>();

    constructor(private readonly request: (command: RequestCommand<T>) => Observable<T>) {
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
                        value: value
                    };

                    return response;
                }),
                catchError((res: HttpErrorResponse) => {
                    const response: CommandResponse<T> = {
                        isSuccess: false,
                        error: res.message,
                        value: {} as T
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