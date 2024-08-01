import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './not-found.page.html',
    styleUrl: './not-found.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
