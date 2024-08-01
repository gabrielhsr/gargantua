import { Routes } from '@angular/router';
import { AuthPage } from '../auth.page';
import { LoginComponent } from '../login/login.component';

export const authRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AuthPage,
        children: [
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'fallback/not-found',
        pathMatch: 'full'
    }
];