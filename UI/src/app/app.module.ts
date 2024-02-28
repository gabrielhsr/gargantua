import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import localeEN from '@angular/common/locales/en';
import localePT from '@angular/common/locales/pt';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './g-routing.module';
import { SharedModule } from './shared/shared.module';

import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from 'ng2-currency-mask';
import { AppBase } from './app.base';
import { AuthenticationHelper } from './shared/helpers/authentication.helper';

registerLocaleData(localePT);
registerLocaleData(localeEN);

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};

@NgModule({
	declarations: [AppBase],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		SharedModule,
		RouterModule,
		TranslateModule.forRoot(
			{
				defaultLanguage: 'pt-br',
				loader: {
					provide: TranslateLoader,
					useFactory: HttpLoaderFactory,
					deps: [HttpClient]
				}
			},
		),
		JwtModule.forRoot(AuthenticationHelper.JWT_CONFIG),
	],
	providers: [
		{
			provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
			useValue: { duration: 2500 }
		},
		{ 
			provide: CURRENCY_MASK_CONFIG, 
			useValue: CustomCurrencyMaskConfig
		}
	],
	bootstrap: [AppBase],
})
export class AppModule {}
