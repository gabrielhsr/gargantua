import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'g-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    public ngOnInit() {
        console.log('init');
    }
}
