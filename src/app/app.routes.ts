import { Routes } from '@angular/router';
import { tokenGuard } from './guards/guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login),
    },
    {
        path: '',
        loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayoutComponent),
        children: [
            {
                path: 'dashboard',
                canActivate: [tokenGuard],
                loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
            },
            // Aquí puedes agregar más rutas que necesiten el sidebar
            // {
            //     path: 'profile',
            //     canActivate: [tokenGuard],
            //     loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
            // },
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
