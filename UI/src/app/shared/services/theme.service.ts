import { Injectable } from '@angular/core';

const LOCALSTORAGE_THEME_KEY = 'theme';
const DEFAULT_THEME = 'light';

type Theme = 'light' | 'dark';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	private get theme(): Theme {
		const stored = localStorage.getItem(LOCALSTORAGE_THEME_KEY);

		if (stored) {
			return stored as Theme;
		}

		return DEFAULT_THEME;
	}

	private set theme(value: Theme) {
		localStorage.setItem(LOCALSTORAGE_THEME_KEY, value);
	}

	public get isDark(): boolean {
		return this.theme === 'dark';
	}

	public get isLight(): boolean {
		return this.theme === 'light';
	}

	public toggle() {
		this.theme = this.theme === 'light' ? 'dark' : 'light';
	}
}
