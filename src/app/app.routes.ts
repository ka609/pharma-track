import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { MedicineListComponent } from './components/medicine-list/medicine-list';
import { MedicineFormComponent } from './components/medicine-form/medicine-form';
import { SalesListComponent } from './components/sales-list/sales-list';
import { SalesFormComponent } from './components/sales-form/sales-form';
import { LoginComponent } from './components/login/login';
import { UserFormComponent } from './components/user-form/user-form';
import { UsersListComponent } from './components/user-list/user-list';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },

  // Médicaments
  { path: 'medicines', component: MedicineListComponent },
  { path: 'medicines/new', component: MedicineFormComponent },

  // Ventes
  { path: 'sales', component: SalesListComponent },
  { path: 'sales/new', component: SalesFormComponent },

  // Utilisateurs
  { path: 'users', component: UsersListComponent },
  { path: 'users/new', component: UserFormComponent }
];
