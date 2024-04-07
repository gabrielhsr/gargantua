import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QueryCommand } from 'src/app/shared/utils/query-command';
import { environment } from 'src/environments/environment';
import { AuthRes, Login } from './authentication.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationEndpoint {
    public url = environment.baseApi + '/api/Authentication/';

    constructor(private readonly http: HttpClient) {}

    public signInCommand(login: () => Login): QueryCommand<AuthRes> {
        return new QueryCommand(() => this.signIn(login()));
    }

    public registerCommand(login: () => Login): QueryCommand<unknown> {
        return new QueryCommand(() => this.register(login()));
    }

    public validateTokenCommand(token: () => string | null): QueryCommand<boolean> {
        const tokenValue = token();

        if (!tokenValue) {
            return new QueryCommand(() => of(false));
        }

        return new QueryCommand(() => this.validateToken(tokenValue));
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
