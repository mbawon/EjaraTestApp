import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Transaction } from '../models/transaction.model';
import { getAllTransactions, TransactionState } from '../store/transaction.store';

@Injectable({
  providedIn: 'root'
})
export class calculateTotalsService{

  transaction$: Observable<Transaction[]>;

  constructor(private store: Store<TransactionState>) {
    this.transaction$ = this.store.select(getAllTransactions);
  }

  calculateRawTotal(data:Transaction[]): number{
    let list = data
    let total = list.reduce((total,obj)=>{
      return total + obj.amount_raw
    },0)

    return total;
  }

  calculateNetTotal(data:Transaction[]): number{
    let list = data
    let total = list.reduce((total,obj)=>{
      return total + obj.amount_net
    },0)

    return total;
  }

  calculateCryptoTotal(data:Transaction[]): number{
    let list = data
    let total = list.reduce((total,obj)=>{
      return total + obj.crypto_amount
    },0)

    return total;
  }

}
