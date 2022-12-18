import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '../../translate/translate.service';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
	@Output() public sidebarButton = new EventEmitter();

	constructor(private readonly translate: TranslateService) {}

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
