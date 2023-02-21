import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { RouteData } from 'src/app/app-routing.module';
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

	public title: string = 'Gargantua';
	public routeData?: RouteData;

	constructor(
		private readonly translate: TranslateService,
		private readonly theme: ThemeService,
		private readonly router: Router
	) {
		this.router.events.subscribe((data) => {
			if (data instanceof RoutesRecognized) {
				this.routeData = data.state.root.firstChild?.data as RouteData;

				if (this.routeData.title) this.title = this.translate.instant(this.routeData.title);
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
