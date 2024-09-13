import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ensureLogged, ensureNotLogged } from './shared/auth/auth.guard';

export interface RouteData {
    title: string;
    showMenu: boolean;
}

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        canActivate: [ensureNotLogged],
        loadChildren: () => import('./pages/auth/routes/auth.routes').then((x) => x.authRoutes)
    },
    {
        path: 'home',
        canActivate: [ensureLogged],
        loadChildren: () => import('./pages/home/routes/home.routes').then((x) => x.homeRoutes)
    },
    {
        path: '',
        loadChildren: () => import('./pages/fallback/routes/fallback.routes').then((x) => x.fallbackRoutes)
    },
    {
        path: '**',
        redirectTo: 'not-found',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
