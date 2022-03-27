import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import { Transaction } from '../models/transaction.model';

export interface TransactionState {
  transactions: TransactionState;
}

export interface TransactionsState {
    allTransactionLoaded: boolean;
    data: Transaction[];
    totals:any;
}

const intialState = {
  allTransactionLoaded: false,
  data: [],
  totals:{}
}

export enum ActionTypes {
  LoadTransactionsRequested = '[Transactions API] Load Transactions Requested',
  LoadTransactions = '[Transaction API] Load Transactions'
}

export class LoadTransactionsRequested implements Action {
  readonly type = ActionTypes.LoadTransactionsRequested;
};

export class LoadTransactions implements Action {
  readonly type = ActionTypes.LoadTransactions;
  constructor(public payload: Transaction[], public totals:any) {}
}

export type TransactionActions = LoadTransactionsRequested | LoadTransactions;

export function transactionsReducer(state = intialState, action:any) {
  switch(action.type) {
      case ActionTypes.LoadTransactions:
      return {
        allTransactionLoaded: true,
        data: action.payload,
        totals:action.totals
      };
    default:
      return state;
  }
}

const getTransactions = createFeatureSelector<TransactionsState>('transactions');

export const getAllTransactions = createSelector(getTransactions, state => state.data);
export const getAllTransactionTotals = createSelector(getTransactions, state => state.totals);
export const getAllTransactionsLoaded = createSelector(getTransactions, state => state.allTransactionLoaded);
