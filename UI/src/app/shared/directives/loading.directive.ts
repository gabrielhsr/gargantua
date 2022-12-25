import { OnInit, OnChanges,	Directive, Input, HostBinding, Renderer2, ElementRef, SimpleChanges } from '@angular/core';
import { GuidHelper } from '../helpers/guid.helper';

@Directive({
	selector: '[loading]',
})
export class LoadingDirective implements OnInit, OnChanges {
	@HostBinding('style.position')
	private hostPosition: string = 'relative';
	private guid?: string;

	@Input() public loading: boolean = false;

	constructor(private element: ElementRef<HTMLElement>, private renderer: Renderer2) {}

	public ngOnInit() {
		const loadingContainer: Element = this.renderer.createElement('div');
		const spinnerContainer: Element = this.renderer.createElement('div');

		this.guid = 'loading-container-' + GuidHelper.generate();

		this.renderer.addClass(loadingContainer, 'loading-container');
		this.renderer.addClass(loadingContainer, this.guid);
		this.renderer.addClass(spinnerContainer, 'spinner-border');

		this.renderer.appendChild(loadingContainer, spinnerContainer);
		this.renderer.appendChild(this.element.nativeElement, loadingContainer);

		this.toggleDisplay(loadingContainer);
	}

	public ngOnChanges(simpleChanges: SimpleChanges) {
		const isLoading = simpleChanges['loading'];

		if (isLoading) {
			const container = this.element.nativeElement;
			const div = container.querySelector('.' + this.guid);

			if (div) this.toggleDisplay(div);
		}
	}

	public toggleDisplay(element: Element) {
		this.renderer.setStyle(element, 'display', this.loading ? 'flex' : 'none');
	}
}
