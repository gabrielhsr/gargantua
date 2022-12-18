import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';

const routes: Routes = [
	{
		path: '',
		component: HomePage,
	},
];

@NgModule({
	declarations: [HomePage, ExpensesComponent, AddDialogComponent],
	imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
	exports: [HomePage],
})
export class HomeModule {}
