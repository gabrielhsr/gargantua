import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationHelper } from '../../helpers/authentication.helper';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        RouterModule
    ]
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
