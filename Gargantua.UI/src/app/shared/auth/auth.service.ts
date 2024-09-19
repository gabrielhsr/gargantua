import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@env/environment";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { lastValueFrom, of, switchMap } from "rxjs";

@Injectable()
export class AuthService {
    private readonly oidcSecurityService = inject(OidcSecurityService);
    private readonly router = inject(Router);

    private _isAuthenticated = false;

    public get isAuthenticated() {
        return this._isAuthenticated;
    }

    public getToken$() {
        return this.oidcSecurityService.getAccessToken();
    }

    public login() {
        this.oidcSecurityService.authorize(undefined);
    }

    public logout() {
        this.oidcSecurityService.logoffLocal();
        window.location.reload();
    }

    public startAuthPipe() {
        const auth$ = this.oidcSecurityService.checkAuth()
            .pipe(
                switchMap((authStatus) => {
                    this._isAuthenticated = authStatus.isAuthenticated;

                    if (!authStatus.isAuthenticated) {
                        this.router.navigate(environment.loginRoute);

                        return of(false);
                    }

                    return of(true);
                })
            );

        return lastValueFrom(auth$);
    }
}