import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseDialogComponent } from './components/expense-dialog/expense-dialog.component';
import { FormsModule } from '@angular/forms';
import { PeriodSelectComponent } from './components/expenses/period-select/period-select.component';
import { MobileViewComponent } from './components/expenses/mobile-view/mobile-view.component';
import { DesktopViewComponent } from './components/expenses/desktop-view/desktop-view.component';

const routes: Routes = [
	{
		path: '',
		component: HomePage,
	},
];

@NgModule({
	declarations: [HomePage, ExpensesComponent, ExpenseDialogComponent, PeriodSelectComponent, MobileViewComponent, DesktopViewComponent],
	imports: [CommonModule, SharedModule, FormsModule, RouterModule.forChild(routes)],
	exports: [HomePage],
})
export class HomeModule {}
