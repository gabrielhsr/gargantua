import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
    imports: [
        AuthModule.forRoot({
            config: {
                authority: 'https://login.microsoftonline.com/99ac8aab-50ef-4acc-8057-54f612bb6dc8/v2.0',
                authWellknownEndpointUrl: 'https://login.microsoftonline.com/99ac8aab-50ef-4acc-8057-54f612bb6dc8/v2.0',
                redirectUrl: 'http://localhost:4200',
                clientId: '38e14400-af20-4076-928c-8bdcccd3afdb',
                scope: 'openid profile offline_access',
                responseType: 'code',
                silentRenew: true,
                useRefreshToken: true,
                maxIdTokenIatOffsetAllowedInSeconds: 600,
                issValidationOff: false,
                autoUserInfo: false,
                ignoreNonceAfterRefresh: true,
                secureRoutes: ['http://localhost:4200']
            },
        }),
    ],
    exports: [AuthModule],
})
export class AuthConfigModule {}
