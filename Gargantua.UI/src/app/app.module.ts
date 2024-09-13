import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppBase } from './app.base';
import { AuthConfigModule } from './shared/auth/auth-config.module';
import { authInterceptor } from './shared/auth/auth.interceptor';
import { AuthService } from './shared/auth/auth.service';
import { TranslateConfigModule } from './shared/i18n/i18n-config.module';

const DEPS_FACTORY = (authService: AuthService) => () => {
    return Promise.all([
        authService.startAuthPipe()
    ]);
}

@NgModule({
    declarations: [AppBase],
    imports: [
        // Application
        AppRoutingModule,

        // Angular
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,

        // i18n
        TranslateConfigModule,

        // Authentication
        AuthConfigModule,
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 2500 },
        },
        {
            provide: APP_INITIALIZER,
            useFactory: DEPS_FACTORY,
            multi: true,
            deps: [AuthService],
        },

        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([authInterceptor])),

        AuthService,
    ],
    bootstrap: [AppBase],
})
export class AppModule {}
