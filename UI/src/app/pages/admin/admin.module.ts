import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPage } from './admin.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputComponent } from './components/input/input.component';

const routes: Routes = [
	{
		path: '',
		component: AdminPage,
	},
];

@NgModule({
	declarations: [AdminPage, InputComponent],
	imports: [
		CommonModule, 
		SharedModule,
		RouterModule.forChild(routes)
	],
	exports: [AdminPage],
})
export class AdminModule {}
