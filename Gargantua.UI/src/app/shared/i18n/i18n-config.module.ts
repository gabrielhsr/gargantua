import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import localeEN from '@angular/common/locales/en';
import localePT from '@angular/common/locales/pt';

function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

registerLocaleData(localePT);
registerLocaleData(localeEN);

const defaultLanguage = 'pt-BR';

@NgModule({
    imports: [
        TranslateModule.forRoot(
            {
                defaultLanguage,
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }
        ),
    ],
    exports: [TranslateModule],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: defaultLanguage
        },
    ]
})
export class TranslateConfigModule {}
