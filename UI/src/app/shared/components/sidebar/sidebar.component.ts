import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationHelper } from '../../helpers/authentication.helper';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    @ViewChild('sidenav') private sidenav?: MatSidenav;

    constructor(public readonly theme: ThemeService, private readonly router: Router) {}

    public get activeStyle(): string {
        return this.theme.isDark ? 'active-item-dark' : 'active-item';
    }

    public toggle(): void {
        if (!this.sidenav) {
            throw new Error('Property "sidenav" undefined!');
        }

        this.sidenav.toggle();
    }

    public logOut() {
        AuthenticationHelper.deleteToken();

        this.sidenav?.close();
        this.router.navigate(['login']);
    }
}
