import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

export interface RouteData {
    title: string;
    showMenu: boolean;
}

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.routes').then((x) => x.loginRoutes),
        data: {
            showMenu: false
        }
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.routes').then((x) => x.homeRoutes),
        data: {
            title: 'home.title',
            showMenu: true
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'expenses',
        loadChildren: () => import('./pages/expenses/expenses.routes').then((x) => x.expensesRoutes),
        data: {
            title: 'expenses.title',
            showMenu: true
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.routes').then((x) => x.settingsRoutes),
        data: {
            title: 'settings.title',
            showMenu: true
        },
        canActivate: [AuthGuard]
    },
    // {
    //     path: 'income',
    //     loadChildren: () => import('./pages/income/income.module').then((m) => m.IncomeModule),
    //     data: {
    //         title: 'Sidebar.Income',
    //         showMenu: true
    //     },
    //     canActivate: [AuthGuard]
    // },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
