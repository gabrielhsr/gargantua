import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, map, of, takeUntil } from 'rxjs';

export interface CommandResponse<T> {
    isSuccess: boolean;
    value: T;
    error?: string;
}

export class RequestCommand<T> {
    public response$ = new Subject<CommandResponse<T>>();
    public isLoading$ = new BehaviorSubject<boolean>(false);

    public response = {} as CommandResponse<T>;

    private readonly destroy$ = new Subject<void>();

    constructor(private readonly request: () => Observable<T>) {
        this.response$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => this.response = value);
    }

    public get isLoading() {
        return this.isLoading$.value;
    }

    public execute() {
        this.isLoading$.next(true);

        this.request()
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
                    console.log(res);

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

    public destroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private handleResponse(response: CommandResponse<T>) {
        this.isLoading$.next(false);
        this.response$.next(response);
    }
}