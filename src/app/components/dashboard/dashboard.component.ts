import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllTransactionTotals, TransactionState } from 'src/app/store/transaction.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  transactionTotals$:Observable<any>
  totals:any

  constructor(private store: Store<TransactionState>) { 
    this.transactionTotals$ = this.store.select(getAllTransactionTotals);
    this.transactionTotals$.subscribe({
      next:(data)=>{
        this.totals = data
      }
    })
  }
  
  ngOnInit(): void {
  }

}
