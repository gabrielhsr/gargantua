import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationHelper } from '../helpers/authentication.helper';
import { TranslateService } from '../translate/translate.service';
@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private readonly router: Router,
		private readonly matSnackBar: MatSnackBar,
		private readonly translate: TranslateService
	) {}

	public canActivate(): boolean {
		const token = AuthenticationHelper.getToken();

		if (token) return true;

		this.router.navigate(['login']);
		this.matSnackBar.open(this.translate.instant("Feedback.TokenExpired"));
		return false;
	}
}
