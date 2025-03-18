import { Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    { path: '', component: HomeComponentComponent },
    { path: 'dashboard', component: UserDashboardComponent},
    
    { path: '**', redirectTo: '' },
];