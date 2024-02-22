import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { RequestCommand } from 'src/app/shared/utils/request-command';
import { environment } from 'src/environments/environment';
import { AuthRes, Login } from './authentication.model';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationEndpoint {
	public url = environment.baseApi + '/api/2.0/Authentication/';

	constructor(private readonly http: HttpClient) {}

	public signInCommand(login: () => Login) {
		return new RequestCommand(() => this.signIn(login()));
	}

	public registerCommand(login: () => Login) {
		return new RequestCommand(() => this.register(login()));
	}

	public validateTokenCommand(token: () => string | null) {
		const tokenValue = token();

		if (!tokenValue) {
			return new RequestCommand(() => of(false));
		}

		return new RequestCommand(() => this.validateToken(tokenValue));
	}

	private signIn(login: Login) {
		console.log(login);

		return this.http.post<AuthRes>(this.url + 'signIn', login);
	}

	private register(login: Login) {
		return this.http.post(this.url + 'register', login);
	}

	private validateToken(token: string) {
		return this.http.post<boolean>(this.url + 'validateToken', { token });
	}
}
