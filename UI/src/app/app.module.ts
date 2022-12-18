import { DEFAULT_CURRENCY_CODE, InjectionToken, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { TranslateService } from './shared/translate/translate.service';

import localePT from '@angular/common/locales/pt';
import localeEN from '@angular/common/locales/en';

import { AppBase } from './app.base';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePT);
registerLocaleData(localeEN);

@NgModule({
	declarations: [AppBase],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		SharedModule,
		PagesModule,
		RouterModule
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
	],
	bootstrap: [AppBase],
})
export class AppModule {}
