import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryComponent } from './category/category.component';

@Component({
    selector: 'g-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
    standalone: true,
    imports: [
        MatCardModule,
        MatTabsModule,
        CategoryComponent,
        TranslateModule
    ]
})
export class SettingsPage implements OnInit {
    public ngOnInit() {
        console.log('init');
    }
}
