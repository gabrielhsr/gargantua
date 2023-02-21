import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationHelper } from '../helpers/authentication.helper';
@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private readonly router: Router) {}

	public canActivate(): boolean {
		const token = AuthenticationHelper.getToken();

		if (token) return true;

		this.router.navigate(["login"]);
		return false;
	}
}
