import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QueryCommand } from 'src/app/shared/utils/command/query-command';
import { environment } from 'src/environments/environment';
import { AuthRes, Login } from './authentication.model';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationEndpoint {
    private readonly httpClient = inject(HttpClient);

    public url = environment.baseApi + '/api/Authentication/';

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
        return this.httpClient.post<AuthRes>(this.url + 'signIn', login);
    }

    private register(login: Login): Observable<unknown> {
        return this.httpClient.post(this.url + 'register', login);
    }

    private validateToken(token: string): Observable<boolean> {
        return this.httpClient.post<boolean>(this.url + 'validateToken', { token });
    }
}
