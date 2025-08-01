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
            {
                path: 'comprobantes',
                canActivate: [tokenGuard],
                loadComponent: () => import('./pages/gestion-comprobantes/gestion-comprobantes').then(m => m.GestionComprobantes),
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
