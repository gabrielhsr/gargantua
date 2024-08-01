import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-unauthorized',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './unauthorized.page.html',
    styleUrl: './unauthorized.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedPage { }
