import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: any = {
    username: null,
    password: null
  };

  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  errorMessage: string = '';
  clearErrorTimer:any;
  processing: boolean = false;
  showPassword: boolean = false;

  constructor(private AuthenticationService: AuthenticationService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getLoginToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    
    if (username === null || username.replace(/\s/g, "") === "" || password === null) {
      this.errorMessage = "Fields required."
      return
    }

    this.processing = true

    this.AuthenticationService.login(username, password).subscribe({
      next: data => {
        console.log(data)
        this.tokenStorage.saveLoginToken(data.token);
        this.tokenStorage.saveLoginInfo(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        window.location.reload();
      },
      error: err => {
        console.log(err)
        this.errorMessage = err.statusText;
        this.isLoginFailed = true;
        this.clearErrorTimer = setTimeout(() => {
          this.errorMessage = ""
          this.processing = false
          this.isLoginFailed=false
        }, 5000);
      }
    });

  }

  togglePassword():void{
    this.showPassword = !this.showPassword
  }

  ngOnDestroy(){
    clearTimeout(this.clearErrorTimer)
  }

}
