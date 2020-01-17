import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProjectsService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  getProject() {
    return this.http
      .get(this.config.apiUrlElogistik + "projects", {
        headers: this.config.httpHeaders(),
        observe: "response"
      })
      .pipe(
        map(res => {
          if (res.status == 200) {
            return res.body;
          }
          return res;
        })
      );
  }
}
