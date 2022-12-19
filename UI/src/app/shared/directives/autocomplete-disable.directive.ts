import { Directive, HostBinding, Attribute } from '@angular/core';

@Directive({
	selector: '[matInput]',
})
export class AutocompleteDisableDirective {
	@HostBinding('attr.autocomplete') auto;
	constructor(@Attribute('autocomplete') autocomplete: string) {
		this.auto = autocomplete || 'off';
	}
}
