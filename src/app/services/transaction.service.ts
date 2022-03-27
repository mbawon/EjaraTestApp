import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from '../constants/constants';

const API_DOMAIN = environment.baseUrl;
const httpOptions = {
  headers: new HttpHeaders(
    {
      'api-key': Constants.apiKey,
      'client-id': Constants.clientId
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  listAllTransactions(): Observable<any> {
    return this.http.get(API_DOMAIN + `marketplace/admin-transactions-per-status-and-type?${'transaction_status=all'}&${'transaction_type=all'}`, httpOptions);
  }

}
