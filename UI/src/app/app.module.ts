import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { TranslateService } from './shared/translate/translate.service';

import localePT from '@angular/common/locales/pt';
import localeEN from '@angular/common/locales/en';

import { AppBase } from './app.base';

import { environment } from 'src/environments/environment';

registerLocaleData(localePT);
registerLocaleData(localeEN);

export function tokenGetter() {
	return localStorage.getItem('jwt');
}

@NgModule({
	declarations: [AppBase],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		SharedModule,
		RouterModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				allowedDomains: [environment.allowedDomains]
			},
		}),
	],
	providers: [
		{
			provide: DEFAULT_CURRENCY_CODE,
			deps: [TranslateService],
			useFactory: (translateService: TranslateService) => translateService.currency
		},
		{	provide: LOCALE_ID,
			deps: [TranslateService],
			useFactory: (translateService: TranslateService) => translateService.language
		},
		{
			provide: CURRENCY_MASK_CONFIG,
			deps: [TranslateService],
			useFactory: (translateService: TranslateService) => translateService.currencyMask
		},
		{	provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
			useValue: { duration: 2500 }
		}
	],
	bootstrap: [AppBase],
})
export class AppModule {}
