import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  transactionDetail: any;

  constructor(private location: Location, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.transactionDetail = this.location.getState()
    if (Object.keys(this.transactionDetail).length === 1) {
      this.router.navigate(["/transaction"])
    }
  }

}
