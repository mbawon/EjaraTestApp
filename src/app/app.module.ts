import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { DateFormaterPipe } from './directive/date-formater.pipe';
import { CurrencyFormaterPipe } from './directive/currency-formater.pipe';
import { SortDirective } from './directive/sort.directive';
import { environment } from '../environments/environment';

import { transactionsReducer, TransactionState, LoadTransactionsRequested } from './store/transaction.store';
import { TransactionEffects } from './effects/transaction.effects';
import { TransactionService } from './services/transaction.service';
import { dispatch } from 'rxjs/internal/observable/pairs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TransactionDetailsComponent,
    TransactionListComponent,
    LayoutComponent,
    DateFormaterPipe,
    CurrencyFormaterPipe,
    SortDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    DateRangePickerModule,
    NgxPaginationModule,
    StoreModule.forRoot({ transactions: transactionsReducer }),
    EffectsModule.forRoot([TransactionEffects]),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25,
    }) : []
  ],
  providers: [authInterceptorProviders, TransactionEffects, TransactionService,
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<TransactionState>) => {
        return () => {
          window.sessionStorage.getItem('auth-token') && store.dispatch(new LoadTransactionsRequested());
        };
      },
      multi: true,
      deps: [Store]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
