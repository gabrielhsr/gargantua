import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesPage } from './expenses.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpenseDialogComponent } from './components/expense-dialog/expense-dialog.component';
import { DesktopViewComponent } from './components/expenses-table/desktop-view/desktop-view.component';
import { MobileViewComponent } from './components/expenses-table/mobile-view/mobile-view.component';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';

const routes: Routes = [
	{
		path: '',
		component: ExpensesPage,
	},
];

@NgModule({
	declarations: [
		ExpensesPage,
		ExpensesTableComponent,
		ExpenseDialogComponent,
		DesktopViewComponent,
		MobileViewComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(routes)
	],
	exports: [ExpensesPage],
})
export class ExpensesModule {}
