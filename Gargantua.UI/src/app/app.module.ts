import { registerLocaleData } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import localeEN from '@angular/common/locales/en';
import localePT from '@angular/common/locales/pt';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from 'ng2-currency-mask';
import { AppBase } from './app.base';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TopbarComponent } from './shared/components/topbar/topbar.component';
import { AuthenticationHelper } from './shared/helpers/authentication.helper';

registerLocaleData(localePT);
registerLocaleData(localeEN);

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.'
};

@NgModule({
    declarations: [AppBase],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        RouterModule,
        TopbarComponent,
        SidebarComponent,
        HttpClientModule,
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
        JwtModule.forRoot(AuthenticationHelper.JWT_CONFIG)
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 2500 }
        },
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'BRL'
        },
        {
            provide: CURRENCY_MASK_CONFIG,
            useValue: CustomCurrencyMaskConfig
        },
        {
            provide: LOCALE_ID,
            useValue: 'pt-BR'
        }
    ],
    bootstrap: [AppBase]
})
export class AppModule {}
