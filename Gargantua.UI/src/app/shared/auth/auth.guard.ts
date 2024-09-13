import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@env/environment";
import { AuthService } from "./auth.service";

export const ensureLogged = () => {
    const authService = inject(AuthService);
    const route = inject(Router);

    if (!authService.isAuthenticated) {
        route.navigate(environment.loginRoute);

        return false;
    }

    return true;
}

export const ensureNotLogged = () => {
    const authService = inject(AuthService);
    const route = inject(Router);

    if (authService.isAuthenticated) {
        route.navigate(environment.homeRoute);

        return false;
    }

    return true;
}