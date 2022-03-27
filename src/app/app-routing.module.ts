import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { AuthGuard } from './shared/auth.guard';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';

const routes: Routes = [
  { 
    path: '',
    component: LayoutComponent, 
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {routeName: "Dashboard"},
        canActivate: [AuthGuard]
      },
      {
        path: 'transaction',
        component: TransactionListComponent,
        data: {routeName: "Transactions"},
        canActivate: [AuthGuard],
      },
      {
        path: 'transaction/details',
        component: TransactionDetailsComponent,
        data: {routeName: "Transactions Details"},
        canActivate: [AuthGuard],
      },
    ]
  },

  // { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard],
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
