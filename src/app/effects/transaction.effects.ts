import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { LoadTransactionsRequested, ActionTypes, LoadTransactions, TransactionState, getAllTransactionsLoaded } from '../store/transaction.store';
import { withLatestFrom, exhaustMap, filter, map } from 'rxjs/operators';
import { TransactionService } from '../services/transaction.service';
import { calculateTotalsService } from '../services/calculate-totals.service';

@Injectable()
export class TransactionEffects {
    totals = {
        totalRawAmnt: 0,
        totalNetAmnt: 0,
        totalCryptoAmnt: 0,
        totalCount: 0
    }
    constructor(
        private actions$: Actions,
        private store: Store<TransactionState>,
        private transactionService: TransactionService,
        private calculateTotalsService: calculateTotalsService
    ) { }

    loadAllTransactions$ = createEffect(() => this.actions$.pipe(
        ofType<LoadTransactionsRequested>(ActionTypes.LoadTransactionsRequested),
        withLatestFrom(this.store.select(getAllTransactionsLoaded)),
        filter(([_, loaded]) => !loaded),
        exhaustMap(() => this.transactionService.listAllTransactions().pipe(
            map(result => {
                this.totals.totalCount = result.data.length
                this.totals.totalRawAmnt = this.calculateTotalsService.calculateRawTotal(result.data)
                this.totals.totalNetAmnt = this.calculateTotalsService.calculateNetTotal(result.data)
                this.totals.totalCryptoAmnt = this.calculateTotalsService.calculateCryptoTotal(result.data)
                return new LoadTransactions(result.data, this.totals)
            })
        ))
    ));
}

