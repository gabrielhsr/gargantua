import { Component, HostBinding } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';

@Component({
	selector: 'g-root',
	templateUrl: './app.base.html',
	styleUrls: ['./app.base.scss']
})
export class AppBase {
	public isDark: boolean;

	@HostBinding('class')
	public get theme() {
		return this.isDark ? 'dark-theme' : 'light-theme'
	}

	constructor(private readonly themeService: ThemeService) {
		this.isDark = themeService.isDark;
	}
}
