import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { DateRange } from '@uiowa/date-range-picker';
import { Store } from '@ngrx/store';
import { TransactionState, getAllTransactions } from '../../store/transaction.store';
import { Observable, Subscription } from 'rxjs';
import { calculateTotalsService } from 'src/app/services/calculate-totals.service';
import { Router } from '@angular/router';
import { TransactionFilterService } from 'src/app/services/transaction-filter.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})

export class TransactionListComponent implements OnInit, OnDestroy {

  //Transaction from store for table
  transactionList: Transaction[] = [];

  //Store
  transactionList$: Observable<Transaction[]>;

  //Pagination
  config: any

  //Date range input field
  dateRange = new DateRange(new Date(), new Date());
  date!: Date;

  //Column totals
  totalRawAmnt: number = 0
  totalNetAmnt: number = 0
  totalCryptoAmnt: number = 0

  //Subscription
  subscriber: Subscription = new Subscription;

  //filter input
  form: any = {
    transactionStatus: "",
    cryptoCurrency: ""
  };

  searching: boolean = false
  filteredTransactionList: Transaction[];

  //Response handlers
  processing: boolean = false;
  responseError: boolean = false;


  constructor(private transactionFilterService: TransactionFilterService, private store: Store<TransactionState>, private router: Router, private calculateTotalsService: calculateTotalsService) {
    this.transactionList$ = this.store.select(getAllTransactions);
    this.filteredTransactionList = []
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
    this.transactionList = []
  }

  ngOnInit(): void {
    this.listTransactions()
  }

  listTransactions(): void {
    this.processing = true
    this.config = {
      itemsPerPage: 20,
      currentPage: 1
    };
    this.subscriber = this.transactionList$.subscribe({
      next: (data) => {
        const arrayToSort = [...data]
        let orderedByDate = arrayToSort.sort(function (x: any, y: any) {
          return y.date_creation - x.date_creation;
        });
        this.config.totalItems = orderedByDate.length
        this.transactionList = orderedByDate
        this.totalRawAmnt = this.calculateTotalsService.calculateRawTotal(orderedByDate)
        this.totalNetAmnt = this.calculateTotalsService.calculateNetTotal(orderedByDate)
        this.totalCryptoAmnt = this.calculateTotalsService.calculateCryptoTotal(orderedByDate)
      },
      error: (e) => {
        this.processing = false;
        this.responseError = true;
        console.error(e)
      }
    })
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  onSubmit(): void {
    const { transactionStatus, cryptoCurrency } = this.form;

    this.searching = true
    const newList = [...this.transactionList]
    let filteredByDate = this.transactionFilterService.filterByDate(newList, this.dateRange.start, this.dateRange.end)
    let filteredByStatusAndCrypto = this.transactionFilterService.filterByStatusAndCrypto(filteredByDate, transactionStatus, cryptoCurrency)

    this.filteredTransactionList = filteredByStatusAndCrypto
    console.log(filteredByStatusAndCrypto)

    if (filteredByStatusAndCrypto.length > 0) {
      this.transactionList = filteredByStatusAndCrypto
      this.totalRawAmnt = this.calculateTotalsService.calculateRawTotal(this.transactionList)
      this.totalNetAmnt = this.calculateTotalsService.calculateNetTotal(this.transactionList)
      this.totalCryptoAmnt = this.calculateTotalsService.calculateCryptoTotal(this.transactionList)

      this.config = {
        itemsPerPage: 20,
        currentPage: 1
      };

      this.searching = false
    }
  }

  handleRow(data: any) {
    this.router.navigateByUrl('/transaction/details', { state: data });
  }

  handleRefresh() {
    window.location.reload()
  }

}
