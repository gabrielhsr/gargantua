import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [CommonModule, SharedModule, HomeModule],
	exports: [HomeModule]
})
export class PagesModule {}
