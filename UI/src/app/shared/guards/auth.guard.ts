import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationHelper } from '../helpers/authentication.helper';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard {
	constructor(private readonly router: Router) {}

	public canActivate(): boolean {
		const token = AuthenticationHelper.getToken();

		if (token) return true;

		this.router.navigate(['login']);
		
		return false;
	}
}
