import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../../Modules/login';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuthModel } from '../../Modules/auth-model';
import { ILogicCode } from '../../Modules/logic-code';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLogin = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }


Login(loginForm:ILogin):Observable<IAuthModel> {

  return this.http.post<IAuthModel>('https://localhost:7138/api/Auth/Login',JSON.stringify(loginForm),{headers:{'Content-Type':'application/json'}});

}
LoginCode(loginFormCode:ILogicCode):Observable<IAuthModel> {

  return this.http.post<IAuthModel>('https://localhost:7138/api/Auth/CheackCode',JSON.stringify(loginFormCode),{headers:{'Content-Type':'application/json'}});

}
IsAuthenticated(): boolean {
  let token = localStorage.getItem('token');
  console.log( token !== null);
  return token !== null;
}
logout() {
  localStorage.removeItem('token');
  this.isLogin.next(false);
}
}
