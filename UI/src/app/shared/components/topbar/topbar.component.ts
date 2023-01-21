import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { capitalize } from '../../helpers/string.helper';
import { ThemeService } from '../../services/theme.service';
import { TranslateService } from '../../translate/translate.service';

@Component({
	selector: 'topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
	@Output()
	public sidebarButton = new EventEmitter();

	public title: string;

	constructor(
		private readonly translate: TranslateService,
		private readonly theme: ThemeService,
		private readonly router: Router
	) {
		this.title = this.translate.instant('Sidebar.Home');

		this.router.events.subscribe(nav => {
			if (nav instanceof NavigationEnd) {
				const routeName = capitalize(nav.url.replace('/', ''));

				if (routeName) this.title = this.translate.instant(`Sidebar.${routeName}`);
			}
		});
	}

	public changeLanguage(): void {
		this.translate.toggleLanguage();
		location.reload();
	}

	public changeCurrency(): void {
		this.translate.toggleCurrency();
		location.reload();
	}

	public changeTheme(): void {
		this.theme.toggle();
		location.reload();
	}
}
