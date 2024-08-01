import { Routes } from '@angular/router';
import { HomePage } from '../home.page';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomePage,
    },
    {
        path: '**',
        redirectTo: 'fallback/not-found',
        pathMatch: 'full'
    }
];