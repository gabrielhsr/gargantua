import { Attribute, Directive, HostBinding } from '@angular/core';

@Directive({
	selector: '[matInput]'
})
export class AutocompleteDisableDirective {
	@HostBinding('attr.autocomplete') public auto;
	constructor(@Attribute('autocomplete') autocomplete: string) {
		this.auto = autocomplete || 'off';
	}
}
