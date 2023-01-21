import { Injectable } from '@angular/core';
import { CurrencyMaskConfig } from 'ng2-currency-mask';

import enDict from 'src/assets/language/en.json';
import ptDict from 'src/assets/language/pt.json';

const resolvePath = require('object-resolve-path');

export type Language = 'pt-BR' | 'en-US';
export type Currency = 'BRL' | 'USD';

const prefix = {
	'pt-BR': { USD: 'US$ ', BRL: 'R$ ' },
	'en-US': { USD: '$', BRL: 'R$' },
};

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

		return DEFAULT_LANGUAGE;
	}

	public get currency(): Currency {
		const stored = localStorage.getItem(LOCALSTORAGE_CURRENCY_KEY);

		if (stored) {
			return stored as Currency;
		}

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

	public instant(id: string, args?: { [key: string]: string }): string {
		const file = this.getFile(this.language);
		const key = id as keyof typeof file;

		let text = resolvePath(file, key) as string;

		if (text) {
			if (args) {
				text.match(/\{{(.+?)\}}/g)?.forEach(toReplace => {
					const key = toReplace.replace('{{', '').replace('}}', '');

					if (args[key]) {
						text = text.replace(toReplace, args[key]);
					}
				});
			}

			return text;
		};

		console.error(`No translation found for key '${key}' in language ${this.language}`);
		return key;
	}

	public toggleLanguage() {
		this.language = this.language === 'en-US' ? 'pt-BR' : 'en-US';
	}

	public toggleCurrency() {
		this.currency = this.currency === 'USD' ? 'BRL' : 'USD';
	}

	private getFile(language: Language) {
		switch (language) {
			case 'pt-BR':
				return ptDict;
			case 'en-US':
				return enDict;
			default:
				this.language = DEFAULT_LANGUAGE;
				throw new Error(`Language file not found! Reseted to '${DEFAULT_LANGUAGE}'.`);
		}
	}
}
