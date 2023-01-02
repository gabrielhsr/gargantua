import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { SharedModule } from '../shared/shared.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
	imports: [CommonModule, SharedModule, HomeModule, AdminModule],
	exports: [HomeModule, AdminModule],
})
export class PagesModule {}
