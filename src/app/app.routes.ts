import { Routes } from '@angular/router';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { HomeComponent } from './components/views/home/home.component';
import { BasicLayoutComponent } from './components/common/layouts/basic-layout.component';
import { BlankLayoutComponent } from './components/common/layouts/blank-layout.component';
import { LoginComponent } from './components/views/login/login.component';
import { SellsComponent } from './components/views/sells/sells.component';
import { TransactionsComponent } from './components/views/transactions/transactions.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    // Main redirect
    {path: '', redirectTo: 'home', pathMatch: 'full'},

    // App views
    {
        path: '', component: BasicLayoutComponent,
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'sells', component: SellsComponent},
            {path: 'history', component: TransactionsComponent},
        ],
        canActivate: [authGuard]
    },
    {
        path: 'login', component: BlankLayoutComponent,
        children: [
            { path: '', component: LoginComponent },
        ]
    },

    // Handle all other routes
    {path: '**',  redirectTo: 'home'}
];