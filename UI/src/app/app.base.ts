import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.base.html',
	styleUrls: ['./app.base.scss'],
})
export class AppBase {
	public theme: string = 'light';

	constructor() {
		const stored = localStorage.getItem('theme');

		if (stored) {
			this.theme = stored;
		} else {
			localStorage.setItem('theme', this.theme);
		}
	}
}
