import { Component, ViewChild, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationHelper } from '../../helpers/authentication.helper';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    @ViewChild('sidenav') private sidenav?: MatSidenav;

    private readonly router = inject(Router);

    public toggle(): void {
        if (!this.sidenav) {
            throw new Error('Property "sidenav" undefined!');
        }

        this.sidenav.toggle();
    }

    public logOut(): void {
        AuthenticationHelper.deleteToken();

        this.sidenav?.close();
        this.router.navigate(['login']);
    }
}
