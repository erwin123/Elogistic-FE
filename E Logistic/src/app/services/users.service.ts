import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalServiceService } from "./global-service.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private services: GlobalServiceService
  ) {}

  loginUser(route: string, data: any) {
    return this.http.post(this.services.apiUrlLogin + route, data).pipe(
      map(res => {
        return res;
      })
    );
  }

  logoutUser(route: string, data: any) {
    return this.http
      .post(this.services.apiUrlLogin + route, data, { observe: "response" })
      .pipe(
        map(res => {
          if (res.status == 200) {
            return res.body;
          }
        })
      );
  }

  sendNotification(route: string, data: any) {
    return this.http
      .post(this.services.apiUrlLogin + route, data, {
        headers: this.services.createAuthorizationHeader(),
        observe: "response"
      })
      .pipe(
        map(res => {
          if (res.status == 200) {
            return res.body;
          }
        })
      );
  }

  detail(data: any) {
    return this.http
      .post(this.services.apiUrlLogin + "users/detail", data, {
        headers: this.services.createAuthorizationHeader(),
        observe: "response"
      })
      .pipe(
        map(res => {
          if (res.status == 200) {
            return res.body;
          }
        })
      );
  }

  update(data: any) {
    return this.http
      .post(this.services.apiUrlLogin + "users/edit", data, {
        headers: this.services.createAuthorizationHeader(),
        observe: "response"
      })
      .pipe(
        map(res => {
          if (res.status == 200) {
            return res.body;
          }
        })
      );
  }

  changePassword(data: any) {
    return this.http
      .post(this.services.apiUrlLogin + "users/changePassword", data, {
        headers: this.services.createAuthorizationHeader(),
        observe: "response"
      })
      .pipe(
        map(res => {
          if (res.status == 200) {
            return res.body;
          }
        })
      );
  }
}
