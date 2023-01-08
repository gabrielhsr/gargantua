import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'config',
		loadChildren: () => import('./pages/config/config.module').then((m) => m.ConfigModule),
	},
	{
		path: 'expenses',
		loadChildren: () => import('./pages/expenses/expenses.module').then((m) => m.ExpensesModule),
	},
	{
		path: 'revenue',
		loadChildren: () => import('./pages/revenue/revenue.module').then((m) => m.RevenueModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
