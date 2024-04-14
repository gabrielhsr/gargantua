import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationHelper } from '../helpers/authentication.helper';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    private readonly router = inject(Router);

    public canActivate(): boolean {
        const token = AuthenticationHelper.getToken();

        if (token) return true;

        this.router.navigate(['login']);

        return false;
    }
}
