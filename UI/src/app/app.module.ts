import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import localeEN from '@angular/common/locales/en';
import localePT from '@angular/common/locales/pt';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppBase } from './app.base';
import { AuthenticationHelper } from './shared/helpers/authentication.helper';

registerLocaleData(localePT);
registerLocaleData(localeEN);

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

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
		}
	],
	bootstrap: [AppBase],
})
export class AppModule {}
