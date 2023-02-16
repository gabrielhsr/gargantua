import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));

// TODO: Fix cors, remove any
// TODO: Fix bug new expense in home page
// TODO: Change the way recurrent expenses and incomes work (duplicate to every month/year)
// TODO: Add checkbox to delete in mass
// TODO: Add a way to add a income of a type to the whole year and set the dates
// TODO: Add authentication
