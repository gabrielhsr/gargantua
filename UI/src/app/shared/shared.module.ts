import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate/translate.pipe';
import { TranslateService } from './translate/translate.service';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MaterialModule } from './material/material.module';
import { TypeSafeMatCellDef } from './directives/type-safe-mat-cell-def.directive';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		// Directives
		TypeSafeMatCellDef,

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
		RouterModule,
		HttpClientModule
	],
	exports: [
		// Modules
		MaterialModule,
		HttpClientModule,

		// Directives
		TypeSafeMatCellDef,

		// Pipes
		TranslatePipe,

		// Components
		TopbarComponent,
		SidebarComponent
	],
	providers: [TranslateService]
})
export class SharedModule {}
