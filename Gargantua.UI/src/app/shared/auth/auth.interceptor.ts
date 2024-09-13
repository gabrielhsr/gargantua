import { HttpHeaders, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    return authService.getToken$().pipe(
        switchMap((token) => {
            if (!token) {
                return next(req);
            }

            const httOptions = {
                headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
            };

            const cloned = req.clone(httOptions);

            return next(cloned);
        })
    );
};
