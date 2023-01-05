import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: HomePage,
	},
];

@NgModule({
	declarations: [HomePage],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(routes),
	],
	exports: [HomePage],
})
export class HomeModule {}
