import { Directive, OnInit, OnChanges, HostBinding, Input, ElementRef, Renderer2, SimpleChanges } from '@angular/core';
import { Guid } from 'src/app/domain/base.model';

@Directive({
	selector: '[loading]',
})
export class LoadingDirective implements OnInit, OnChanges {
	@HostBinding('style.position')
	private hostPosition: string = 'relative';
	private guid?: string;

	private loadingElement: Element = this.renderer.createElement('div');

	@Input() public loading: boolean = false;

	constructor(private element: ElementRef<HTMLElement>, private renderer: Renderer2) {}

	public ngOnInit() {
		const spinner: Element = this.renderer.createElement('div');

		this.guid = 'loading-container-' + Guid.new();

		this.renderer.addClass(this.loadingElement, 'loading-container');
		this.renderer.addClass(this.loadingElement, this.guid);
		this.renderer.addClass(spinner, 'spinner-border');

		this.renderer.appendChild(this.loadingElement, spinner);
		this.renderer.appendChild(this.element.nativeElement, this.loadingElement);

		this.toggleDisplay();
	}

	public ngOnChanges(simpleChanges: SimpleChanges) {
		const isLoading = simpleChanges['loading'];

		if (isLoading) this.toggleDisplay();
	}

	public toggleDisplay() {
		if (this.loading) {
			this.renderer.appendChild(this.element.nativeElement, this.loadingElement);
		} else {
			this.renderer.removeChild(this.element.nativeElement, this.loadingElement);
		}
	}
}
