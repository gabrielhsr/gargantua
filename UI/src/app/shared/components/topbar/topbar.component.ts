import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RouteData } from 'src/app/app-routing.module';
import { ThemeService } from '../../services/theme.service';

@Component({
	selector: 'topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
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

				if (this.routeData.title) this.title = this.routeData.title;
			}
		});
	}

	public changeLanguage(): void {
		const currentLang = this.translate.currentLang;

		if (!currentLang || currentLang === 'pt-br') {
			this.translate.use('en');
		} else {
			this.translate.use('pt-br');
		}
	}

	public changeTheme(): void {
		this.theme.toggle();
		location.reload();
	}
}
