import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '@env/environment';
import { AuthService } from '@gargantua/shared/auth/auth.service';
import { Base } from '@gargantua/shared/components/base/base.component';
import { TranslateModule } from '@ngx-translate/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-home',
    imports: [
        CommonModule,
        TranslateModule,
        HlmButtonDirective
    ],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss'
})
export class HomePage extends Base {
    private readonly authService = inject(AuthService);
    private readonly httpClient = inject(HttpClient);

    protected exampleFetch() {
        const url = environment.baseApi + '/api/Example';

        this.httpClient.get(url)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => console.log(res));
    }
    
    protected logout() {
        this.authService.logout();
    }
}
