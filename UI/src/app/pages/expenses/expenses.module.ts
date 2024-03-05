import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpenseDialogComponent } from './components/expense-dialog/expense-dialog.component';
import { ExpensesPage } from './expenses.page';

const routes: Routes = [
	{
		path: '',
		component: ExpensesPage
	}
];

@NgModule({
	declarations: [
		ExpensesPage,
		ExpenseDialogComponent
		// ExpensesTableComponent,
		// DesktopViewComponent,
		// MobileViewComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(routes)
	],
	exports: [ExpensesPage]
})
export class ExpensesModule {}
