import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges, inject } from '@angular/core';
import { Guid } from 'src/app/domain/base.model';

@Directive({
    selector: '[loading]',
    standalone: true
})
export class LoadingDirective implements OnInit, OnChanges {
    private readonly element = inject(ElementRef<HTMLElement>);
    private readonly renderer = inject(Renderer2);

    @HostBinding('style.position')
    private hostPosition: string = 'relative';
    private guid?: string;
    
    private loadingElement: Element = this.renderer.createElement('div');

    @Input() public loading: boolean = false;

    public ngOnInit(): void {
        const spinner: Element = this.renderer.createElement('div');

        this.guid = 'loading-container-' + Guid.new();

        this.renderer.addClass(this.loadingElement, 'loading-container');
        this.renderer.addClass(this.loadingElement, this.guid);
        this.renderer.addClass(spinner, 'spinner-border');

        this.renderer.appendChild(this.loadingElement, spinner);
        this.renderer.appendChild(this.element.nativeElement, this.loadingElement);

        this.toggleDisplay();
    }

    public ngOnChanges(simpleChanges: SimpleChanges): void {
        const isLoading = simpleChanges['loading'];

        if (isLoading) this.toggleDisplay();
    }

    public toggleDisplay(): void {
        if (this.loading) {
            this.renderer.appendChild(this.element.nativeElement, this.loadingElement);
        } else {
            this.renderer.removeChild(this.element.nativeElement, this.loadingElement);
        }
    }
}
