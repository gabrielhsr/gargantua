import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule, inject, provideAppInitializer } from '@angular/core';
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
        provideAppInitializer(() => {
            const authService = inject(AuthService);

            return authService.startAuthPipe();
        }),

        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([authInterceptor])),

        AuthService
    ],
    bootstrap: [AppBase],
})
export class AppModule { }
