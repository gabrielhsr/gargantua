import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointService } from 'src/app/shared/services/breakpoint.service';
import { CategoryComponent } from './category/category.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTabsModule,
        CategoryComponent,
        TranslateModule
    ]
})
export class SettingsPage implements OnInit {
    private breakPointService = inject(BreakpointService);

    public get isMobile$() {
        return this.breakPointService.isMobile$;
    }

    public ngOnInit() {
        console.log('init');
    }
}
