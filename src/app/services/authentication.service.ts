import { HttpClient, HttpHeaders } from '@angular/common/http';
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

export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(log: string, password: string): Observable<any> {
    return this.http.post(API_DOMAIN + 'auth/login', {
      log,
      password
    }, httpOptions);

  }

}
