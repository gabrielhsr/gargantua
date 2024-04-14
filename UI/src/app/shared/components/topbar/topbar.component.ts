import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RouteData } from 'src/app/app-routing.module';

@Component({
    selector: 'topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
    private readonly translate = inject(TranslateService);
    private readonly router = inject(Router);

    protected title: string = 'Gargantua';
    protected routeData?: RouteData;

    @Output() public sidebarButton = new EventEmitter();

    public ngOnInit() {
        this.router.events.subscribe((data) => {
            if (data instanceof RoutesRecognized) {
                this.routeData = data.state.root.firstChild?.data as RouteData;

                if (this.routeData.title) this.title = this.routeData.title;
            }
        });
    }

    public changeLanguage(): void {
        const currentLang = this.translate.currentLang;

        if (!currentLang || currentLang === 'pt-br') {
            this.translate.use('en');
        } else {
            this.translate.use('pt-br');
        }
    }
}
