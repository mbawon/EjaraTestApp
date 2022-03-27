import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionFilterService {

  constructor() { }

  filterByDate(list: Transaction[], start: any, end: any): Transaction[] {
    let data = list
    let unixTimestampStart = Math.floor(new Date(start).getTime())
    let unixTimestampEnd = Math.floor(new Date(end).getTime())

    let newList = data.filter((dta) => {
      return dta.date_creation >= unixTimestampStart && dta.date_creation <= unixTimestampEnd
    })
    return newList
  }

  filterByStatusAndCrypto(list: Transaction[], status: string, crypto: string): Transaction[] {
    let data = list
    let newList = data.filter((dta)=>{
      return dta.transaction_status === status && dta.crypto_currency === crypto;
    })
    return newList;
  }
}
