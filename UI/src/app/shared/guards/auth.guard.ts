import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

type CanActivateUnion = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private readonly router: Router, private jwtHelper: JwtHelperService) {}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanActivateUnion {
		const token = localStorage.getItem("jwt");

		if (token && !this.jwtHelper.isTokenExpired(token)) {
			return true;
		}

		this.router.navigate(["login"]);
		return false;
	}
}
