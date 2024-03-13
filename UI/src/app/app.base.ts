import { Component, HostBinding } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';

@Component({
    selector: 'g-root',
    templateUrl: './app.base.html',
    styleUrls: ['./app.base.scss']
})
export class AppBase {
    public isDark: boolean;

    constructor(private readonly themeService: ThemeService) {
        this.isDark = themeService.isDark;
    }

    @HostBinding('class')
    public get theme(): string {
        return this.isDark ? 'dark-theme' : 'light-theme';
    }
}
