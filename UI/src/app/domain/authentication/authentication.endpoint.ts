import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestCommand } from 'src/app/shared/utils/request-command';
import { environment } from 'src/environments/environment';
import { AuthRes, Login } from './authentication.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationEndpoint {
    public url = environment.baseApi + '/api/Authentication/';

    constructor(private readonly http: HttpClient) {}

    public signInCommand(login: () => Login): RequestCommand<AuthRes> {
        return new RequestCommand(() => this.signIn(login()));
    }

    public registerCommand(login: () => Login): RequestCommand<unknown> {
        return new RequestCommand(() => this.register(login()));
    }

    public validateTokenCommand(token: () => string | null): RequestCommand<boolean> {
        const tokenValue = token();

        if (!tokenValue) {
            return new RequestCommand(() => of(false));
        }

        return new RequestCommand(() => this.validateToken(tokenValue));
    }

    private signIn(login: Login): Observable<AuthRes> {
        return this.http.post<AuthRes>(this.url + 'signIn', login);
    }

    private register(login: Login): Observable<unknown> {
        return this.http.post(this.url + 'register', login);
    }

    private validateToken(token: string): Observable<boolean> {
        return this.http.post<boolean>(this.url + 'validateToken', { token });
    }
}
