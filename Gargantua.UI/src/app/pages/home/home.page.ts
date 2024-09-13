import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        MatButtonModule
    ],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss'
})
export class HomePage {
    private readonly httpClient = inject(HttpClient);

    protected test() {
        this.httpClient.get('https://localhost:7242/api/Category').subscribe((x) => console.error(x));
    }
}
