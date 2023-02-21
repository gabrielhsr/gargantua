import { Injectable } from '@angular/core';
import { AuthenticationEndpoint } from 'src/app/entities/authentication/authentication.endpoint';
import { Login } from 'src/app/entities/authentication/authentication.model';

@Injectable()
export class AuthenticationService {
	constructor(private readonly endpoint: AuthenticationEndpoint) {}

	public signIn(login: Login) {
		return this.endpoint.signIn(login);
	}
}
