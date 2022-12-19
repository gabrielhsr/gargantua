import { Injectable } from '@angular/core';
import { CurrencyMaskConfig } from 'ng2-currency-mask';

import enDict from 'src/assets/language/en.json';
import ptDict from 'src/assets/language/pt.json';

const resolvePath = require('object-resolve-path');

export type Language = 'pt-BR' | 'en-US';
export type Currency = 'BRL' | 'USD';

const prefix = { 'pt-BR': { USD: 'US$ ', BRL: 'R$ ' }, 'en-US': { USD: '$', BRL: 'R$' } };
const decimal = { 'pt-BR': ',', 'en-US': '.' };
const thousands = { 'pt-BR': '.', 'en-US': ',' };

const LOCALSTORAGE_LANGUAGE_KEY = 'language';
const LOCALSTORAGE_CURRENCY_KEY = 'currency';

const DEFAULT_LANGUAGE = 'en-US';
const DEFAULT_CURRENCY = 'USD';

const DEFAULT_CURRENCY_MASK = {
	align: 'right',
	allowNegative: false,
	precision: 2,
	suffix: ''
};

@Injectable()
export class TranslateService {
	public get language(): Language {
		const stored = localStorage.getItem(LOCALSTORAGE_LANGUAGE_KEY);

		if (stored) {
			return stored as Language;
		}

		this.setDefaultLanguage();
		return DEFAULT_LANGUAGE;
	}

	public get currency(): Currency {
		const stored = localStorage.getItem(LOCALSTORAGE_CURRENCY_KEY);

		if (stored) {
			return stored as Currency;
		}

		this.setDefaultCurrency();
		return DEFAULT_CURRENCY;
	}

	public get currencyMask(): CurrencyMaskConfig {
		const mask: CurrencyMaskConfig = {
			...DEFAULT_CURRENCY_MASK,
			prefix: prefix[this.language][this.currency],
			decimal: decimal[this.language],
			thousands: thousands[this.language]
		};

		return mask;
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
		const text = resolvePath(file, key);

		if (text) return text;

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
				throw new Error(`Language file not found! Reseted to '${DEFAULT_LANGUAGE}'.`);
		}
	}

	private setDefaultLanguage(): void {
		this.language = DEFAULT_LANGUAGE;
	}

	private setDefaultCurrency(): void {
		this.currency = DEFAULT_CURRENCY;
	}
}
