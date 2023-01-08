import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { SharedModule } from '../shared/shared.module';
import { ConfigModule } from './config/config.module';

@NgModule({
	imports: [CommonModule, SharedModule, HomeModule, ConfigModule],
	exports: [HomeModule, ConfigModule],
})
export class PagesModule {}
