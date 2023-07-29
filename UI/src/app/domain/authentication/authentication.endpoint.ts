import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { AuthRes, Login } from './authentication.model';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationEndpoint {
	public url = '/api/2.0/Authentication/';

	constructor(private readonly http: HttpService) {}

	public signIn(login: Login) {
		return this.http.post<Login, AuthRes>(this.url + 'signIn', login);
	}

	public register(login: Login) {
		return this.http.post<Login, void>(this.url + 'register', login);
	}

	public validateToken(token: string) {
		return this.http.post<AuthRes, boolean>(this.url + 'validateToken', { token });
	}
}
