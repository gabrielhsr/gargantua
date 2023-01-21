import { Component } from '@angular/core';
import {  ThemeService } from './shared/services/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.base.html',
	styleUrls: ['./app.base.scss'],
})
export class AppBase {
	public isDark: boolean;

	constructor(private readonly theme: ThemeService) {
		this.isDark = theme.isDark;
	}
}
