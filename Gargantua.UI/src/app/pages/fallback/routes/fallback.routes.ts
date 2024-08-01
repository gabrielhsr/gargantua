import { Routes } from '@angular/router';
import { NotFoundPage } from '../not-found/not-found.page';
import { UnauthorizedPage } from '../unauthorized/unauthorized.page';

export const fallbackRoutes: Routes = [
    {
        path: 'not-found',
        component: NotFoundPage,
    },
    {
        path: 'unauthorized',
        component: UnauthorizedPage,
    }
];