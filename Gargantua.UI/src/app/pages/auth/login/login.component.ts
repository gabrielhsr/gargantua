import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@gargantua/shared/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        TranslateModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private readonly authService = inject(AuthService);

    protected login() {
        this.authService.login();
    }
}
