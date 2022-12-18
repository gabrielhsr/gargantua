import { Injectable } from '@angular/core';

import enDict from 'src/assets/language/en.json';
import ptDict from 'src/assets/language/pt.json';

const resolvePath = require('object-resolve-path');

export type Language = 'pt-BR' | 'en-US';
export type Currency = 'BRL' | 'USD';

const LOCALSTORAGE_LANGUAGE_KEY = 'language';
const LOCALSTORAGE_CURRENCY_KEY = 'currency';

const DEFAULT_LANGUAGE = 'en-US';
const DEFAULT_CURRENCY = 'USD';

@Injectable()
export class TranslateService {
	constructor() {
		if (!this.language) this.setDefaultLanguage();
		if (!this.currency) this.setDefaultCurrency();
	}

	public get language(): Language {
		return localStorage.getItem(LOCALSTORAGE_LANGUAGE_KEY) as Language;
	}

	public get currency(): Currency {
		return localStorage.getItem(LOCALSTORAGE_CURRENCY_KEY) as Currency;
	}

	public set language(value: Language) {
		localStorage.setItem(LOCALSTORAGE_LANGUAGE_KEY, value);
	}

	public set currency(value: Currency) {
		localStorage.setItem(LOCALSTORAGE_CURRENCY_KEY, value);
	}

	public translate(id: string): string {
		const file = this.getFile(this.language);
		const key = id as keyof typeof file;

		if (resolvePath(file, key)) return resolvePath(file, key);

		console.error(`No translation found for key ${key} in language ${this.language}`);
		return key;
	}

	private getFile(language: Language) {
		switch (language) {
			case 'pt-BR':
				return ptDict;
			case 'en-US':
				return enDict;
			default:
				this.setDefaultLanguage();
				throw new Error("Language file not found! Reseted to 'pt-BR'.");
		}
	}

	private setDefaultLanguage(): void {
		this.language = DEFAULT_LANGUAGE;
	}

	private setDefaultCurrency(): void {
		this.currency = DEFAULT_CURRENCY;
	}
}
