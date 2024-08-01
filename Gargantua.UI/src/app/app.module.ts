import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import localeEN from '@angular/common/locales/en';
import localePT from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';

import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppBase } from './app.base';
import { AuthConfigModule } from './shared/auth/auth-config.module';

registerLocaleData(localePT);
registerLocaleData(localeEN);

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [AppBase],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        TranslateModule.forRoot(
            {
                defaultLanguage: 'pt-br',
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }
        ),
        AuthConfigModule
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 2500 }
        },
        {
            provide: LOCALE_ID,
            useValue: 'pt-BR'
        },
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ],
    bootstrap: [AppBase]
})
export class AppModule {}
