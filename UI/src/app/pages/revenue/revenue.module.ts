import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenuePage } from './revenue.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RevenueTableComponent } from './components/revenue-table/revenue-table.component';
import { RevenuePeriodSelectComponent } from './components/revenue-table/period-select/period-select.component';
import { RevenueMobileViewComponent } from './components/revenue-table/mobile-view/mobile-view.component';
import { RevenueDesktopViewComponent } from './components/revenue-table/desktop-view/desktop-view.component';
import { RevenueDialogComponent } from './components/revenue-dialog/revenue-dialog.component';

const routes: Routes = [
	{
		path: '',
		component: RevenuePage,
	},
];

@NgModule({
	declarations: [
		RevenuePage,
		RevenueTableComponent,
		RevenuePeriodSelectComponent,
		RevenueMobileViewComponent,
		RevenueDesktopViewComponent,
		RevenueDialogComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(routes)
	],
	exports: [RevenuePage]
})
export class RevenueModule {}
