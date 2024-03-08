import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage
    }
];

@NgModule({
    declarations: [HomePage],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [HomePage]
})
export class HomeModule {}
