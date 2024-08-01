import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl: './auth.page.html',
    styleUrl: './auth.page.scss',
})
export class AuthPage {}
