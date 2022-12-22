import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Directives
import { AutocompleteDisableDirective } from './directives/autocomplete-disable.directive';
import { TypeSafeMatCellDef } from './directives/type-safe-mat-cell-def.directive';

// Pipes
import { TranslatePipe } from './translate/translate.pipe';

// Services
import { TranslateService } from './translate/translate.service';

// Components
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// Modules
import { MaterialModule } from './material/material.module';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		// Directives
		TypeSafeMatCellDef,
		AutocompleteDisableDirective,

		// Pipes
		TranslatePipe,

		// Components
		TopbarComponent,
		SidebarComponent
	],
	imports: [
		// Modules
		CommonModule,
		MaterialModule,
		RouterModule
	],
	exports: [
		// Modules
		MaterialModule,
		HttpClientModule,
		CurrencyMaskModule,
		ReactiveFormsModule,

		// Directives
		TypeSafeMatCellDef,
		AutocompleteDisableDirective,

		// Pipes
		TranslatePipe,

		// Components
		TopbarComponent,
		SidebarComponent
	],
	providers: [TranslateService]
})
export class SharedModule {}
