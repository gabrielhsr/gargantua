import { Directive, HostListener, OnInit } from '@angular/core';

@Directive({
	selector: '[preventDefault]',
})
export class PreventDefaultDirective {
	@HostListener('click', ['$event'])
  	private onClick($event: PointerEvent) {
		$event.stopPropagation();
		$event.preventDefault();
	}
}
