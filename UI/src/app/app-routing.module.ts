import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

export interface RouteData {
	title: string;
	showMenu: boolean;
}

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
		data: {
			showMenu: false
		}
	},
	{
		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
		data: {
			title: 'Sidebar.Home',
			showMenu: true
		},
		canActivate: [AuthGuard]
	},
	// {
	// 	path: 'config',
	// 	loadChildren: () => import('./pages/config/config.module').then((m) => m.ConfigModule),
	// 	data: {
	// 		title: 'Sidebar.Config',
	// 		showMenu: true
	// 	},
	// 	canActivate: [AuthGuard]
	// },
	{
		path: 'expenses',
		loadChildren: () => import('./pages/expenses/expenses.module').then((m) => m.ExpensesModule),
		data: {
			title: 'Sidebar.Expenses',
			showMenu: true
		},
		canActivate: [AuthGuard]
	},
	// {
	// 	path: 'income',
	// 	loadChildren: () => import('./pages/income/income.module').then((m) => m.IncomeModule),
	// 	data: {
	// 		title: 'Sidebar.Income',
	// 		showMenu: true
	// 	},
	// 	canActivate: [AuthGuard]
	// },
	{
		path: '**',
		redirectTo: 'home',
		pathMatch: 'full'
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
