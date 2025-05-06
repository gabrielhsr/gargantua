import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@gargantua/shared/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';


@Component({
    selector: 'app-login',
    imports: [
        CommonModule,
        TranslateModule,
        HlmButtonDirective
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    private readonly authService = inject(AuthService);

    protected login() {
        this.authService.login();
    }
}
