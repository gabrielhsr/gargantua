import { NgModule } from '@angular/core';
import { environment } from '@env/environment';
import { AuthModule, provideAuth } from 'angular-auth-oidc-client';

@NgModule({
    providers: [
        provideAuth({
            config: {
                authority: environment.authority,
                redirectUrl: environment.baseUi,
                clientId: environment.clientId,
                scope: environment.scopes,
                responseType: 'code',
                silentRenew: true,
                useRefreshToken: true,
                maxIdTokenIatOffsetAllowedInSeconds: 600,
                issValidationOff: false,
                autoUserInfo: false,
                ignoreNonceAfterRefresh: true,
                secureRoutes: [environment.baseUi]
            },
        })
    ],
    exports: [AuthModule],
})
export class AuthConfigModule {}
