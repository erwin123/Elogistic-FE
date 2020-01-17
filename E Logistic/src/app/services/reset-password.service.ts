import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalServiceService } from "./global-service.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ResetPasswordService {
  constructor(
    private http: HttpClient,
    private services: GlobalServiceService
  ) {}

  resetPassword(data) {
    return this.http
      .post(this.services.apiUrlLogin + "reset_password", data, {
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
