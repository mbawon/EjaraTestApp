import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators'
import { Location } from '@angular/common';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  routeName: any = "";
  userInfo:string = "";

  constructor(private tokenStorageService: TokenStorageService, private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.url.subscribe(() => {
      this.routeName = activatedRoute.snapshot.firstChild!.data.routeName;
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      map(route => this.routeName = route.snapshot.data["routeName"])
    ).subscribe()

    this.userInfo = this.tokenStorageService.getLoginInfo().data.email_address
  }

  logout(){
    this.tokenStorageService.LogOut()
    window.location.reload()
  }

}
