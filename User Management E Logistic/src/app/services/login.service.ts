import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FormLogin } from "../entity";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  loginService(data: FormLogin): Observable<any> {
    return this.http.post<any>(this.config.apiLoginUrl + "users/login", data);
  }

  logoutService(data: any): Observable<any> {
    return this.http.post<any>(this.config.apiLoginUrl + "users/logout", data);
  }
}
