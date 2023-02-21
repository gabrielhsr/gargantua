import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { AuthRes, Login } from './authentication.model';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationEndpoint {
	public url = '/api/Authentication/';

	constructor(private readonly service: HttpService) {}

	public signIn(login: Login) {
		return this.service.post<Login, AuthRes>(this.url + 'signIn', login);
	}

	public validateToken(token: string) {
		return this.service.post<AuthRes, boolean>(this.url + 'validateToken', { token });
	}
}
