import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalServiceService } from "./global-service.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ZoneService {
  constructor(
    private http: HttpClient,
    private services: GlobalServiceService
  ) {}

  getZoneByProject(data) {
    return this.http
      .post(this.services.apiUrl + "zones/byProject", data, {
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
