import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  jwtHelper = inject(JwtHelperService);

  URL = environment.URL

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService
  ) {}


  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.authToken);
  }

  get authToken(){
    return this.cookieService.get('authToken');
  }

  router = inject(Router)

  singIn(username: string, password: string){
    this.router.navigateByUrl("dashboard");
    this.http.post<{token:string}>(`${this.URL}/login`, {username:username, password:password}).subscribe(res => {
      this.cookieService.set('authToken', res.token);
      this.router.navigateByUrl("dashboard");
    })
   
  }


  logout(){
    this.cookieService.delete("authToken");
    this.router.navigateByUrl("singIn");
  }

}
