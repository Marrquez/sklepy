import { Routes } from '@angular/router';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { HomeComponent } from './components/views/home/home.component';
import { BasicLayoutComponent } from './components/common/layouts/basic-layout.component';
import { BlankLayoutComponent } from './components/common/layouts/blank-layout.component';
import { LoginComponent } from './components/views/login/login.component';

export const routes: Routes = [
    // Main redirect
    {path: '', redirectTo: 'home', pathMatch: 'full'},

    // App views
    {
        path: '', component: BasicLayoutComponent,
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'dashboard', component: DashboardComponent},
        ]
    },
    {
        path: 'login', component: BlankLayoutComponent,
        children: [
        { path: 'login', component: LoginComponent },
        ]
    },

    // Handle all other routes
    {path: '**',  redirectTo: 'home'}
];