export class CommandResponse<T> {
    public isSuccess: boolean = false;
    public data?: T;
    public error?: string;
}