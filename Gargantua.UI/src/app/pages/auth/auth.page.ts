import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule
    ],
    templateUrl: './auth.page.html',
    styleUrl: './auth.page.scss',
})
export class AuthPage {}
