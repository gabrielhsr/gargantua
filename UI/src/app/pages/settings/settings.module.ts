import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsPage } from './settings.page';

const routes: Routes = [
    {
        path: '',
        component: SettingsPage,
    },
];

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
    declarations: [SettingsPage],
})
export class SettingsModule {}
