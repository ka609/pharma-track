import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { adminGuard } from './core/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { // Dashboard accessible à tous les connectés
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard')
      .then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },

  { // Login public
    path: 'login',
    loadComponent: () => import('./components/login/login')
      .then(m => m.LoginComponent)
  },

  { // Médicaments accessibles uniquement à l'admin
    path: 'medicines',
    loadComponent: () => import('./components/medicine-list/medicine-list')
      .then(m => m.MedicineListComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'medicines/new',
    loadComponent: () => import('./components/medicine-form/medicine-form')
      .then(m => m.MedicineFormComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'medicines/edit/:id',
    loadComponent: () => import('./components/medicine-form/medicine-form')
      .then(m => m.MedicineFormComponent),
    canActivate: [authGuard, adminGuard]
  },

  { // Ventes accessibles à tous les connectés
    path: 'sales',
    loadComponent: () => import('./components/sales-list/sales-list')
      .then(m => m.SalesListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'sales/new',
    loadComponent: () => import('./components/sales-form/sales-form')
      .then(m => m.SalesFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'sales/edit/:id',
    loadComponent: () => import('./components/sales-form/sales-form')
      .then(m => m.SalesFormComponent),
    canActivate: [authGuard]
    
  },

  { // Utilisateurs uniquement admin
    path: 'users',
    loadComponent: () => import('./components/user-list/user-list')
      .then(m => m.UsersListComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'users/new',
    loadComponent: () => import('./components/user-form/user-form')
      .then(m => m.UserFormComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'users/edit/:id',
    loadComponent: () => import('./components/user-form/user-form')
      .then(m => m.UserFormComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
  path: 'change-credentials',
  loadComponent: () => import('./components/change-credentials/change-credentials')
    .then(m => m.ChangeCredentialsComponent),
  canActivate: [authGuard, adminGuard]
}

];
