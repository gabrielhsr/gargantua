import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { capitalize } from '../../helpers/string.helper';
import { TranslateService } from '../../translate/translate.service';

@Component({
	selector: 'topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
	@Output() public sidebarButton = new EventEmitter();
	public title: string;

	constructor(
		private readonly translate: TranslateService,
		private readonly router: Router
	) {
		this.title = this.translate.instant('Title');

		this.router.events.subscribe(nav => {
			if (nav instanceof NavigationEnd) {
				const routeName = capitalize(nav.url.replace('/', ''));

				this.title = this.translate.instant(`Sidebar.${routeName}`);
			}
		});
	}

	public changeLanguage(): void {
		if (this.translate.language === 'en-US') {
			this.translate.language = 'pt-BR';
		} else {
			this.translate.language = 'en-US';
		}

		location.reload();
	}

	public changeCurrency(): void {
		if (this.translate.currency === 'USD') {
			this.translate.currency = 'BRL';
		} else {
			this.translate.currency = 'USD';
		}

		location.reload();
	}
}
