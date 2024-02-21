import { Observable, Subject, takeUntil, tap } from "rxjs";
import { HttpHandleResponse } from "../services/http.service";

export class RequestCommand<T> {
    public response$ = new Subject<HttpHandleResponse<T>>();
    public isLoading$ = new Subject<boolean>();

    private readonly destroy$ = new Subject<void>();

    constructor(private readonly request: Observable<HttpHandleResponse<T>>) {
    }

    public get response() {
        return this.response$.observed;
    }

    public get isLoading() {
        return this.isLoading$.observed;
    }

    public execute() {
        this.request
            .pipe(takeUntil(this.destroy$), tap(() => this.isLoading$.next(true)))
            .subscribe(response => this.handleResponse(response));
    }

    public destroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private handleResponse(response: HttpHandleResponse<T>) {
        this.isLoading$.next(false);
        this.response$.next(response);
    }
}