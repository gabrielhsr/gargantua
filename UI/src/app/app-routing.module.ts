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
        loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
        data: {
            showMenu: false
        }
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
        data: {
            title: 'home.title',
            showMenu: true
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'expenses',
        loadChildren: () => import('./pages/expenses/expenses.module').then((m) => m.ExpensesModule),
        data: {
            title: 'expenses.title',
            showMenu: true
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then((m) => m.SettingsModule),
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
