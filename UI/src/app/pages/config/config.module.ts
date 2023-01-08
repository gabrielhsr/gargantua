import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigPage } from './config.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputComponent } from './components/input/input.component';

const routes: Routes = [
	{
		path: '',
		component: ConfigPage,
	},
];

@NgModule({
	declarations: [ConfigPage, InputComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(routes)
	],
	exports: [ConfigPage],
})
export class ConfigModule {}
