import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        loadChildren: () => import('./pages/auth/routes/auth.routes').then((x) => x.authRoutes)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/routes/home.routes').then((x) => x.homeRoutes)
    },
    {
        path: 'fallback',
        loadChildren: () => import('./pages/fallback/routes/fallback.routes').then((x) => x.fallbackRoutes)
    },
    {
        path: '**',
        redirectTo: 'fallback/not-found',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
