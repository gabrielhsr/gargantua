import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { AuthenticatedResponse, Login } from './authentication.model';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationEndpoint {
	public url = '/api/Authentication/';

	constructor(private readonly service: HttpService) {}

	public signIn(login: Login) {
		return this.service.post<Login, AuthenticatedResponse>(this.url + 'signIn', login);
	}
}
