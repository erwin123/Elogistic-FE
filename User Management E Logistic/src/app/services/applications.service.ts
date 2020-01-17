import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApplicationsService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  getApplications() {
    return this.http
      .get(this.config.apiUrl + "applications", {
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

  addApplication(data) {
    return this.http
      .post(this.config.apiUrl + "applications", data, {
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

  updateApplication(data) {
    return this.http
      .post(this.config.apiUrl + "applications/edit", data, {
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

  getApplicationMenu(applicationId) {
    return this.http
      .get(this.config.apiUrl + "applications/" + applicationId, {
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

  addMenu(data) {
    return this.http
      .post(this.config.apiUrl + "applications/addMenu", data, {
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

  activatedMenu(data) {
    return this.http
      .post(this.config.apiUrl + "applications/activated", data, {
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

  deleteMenu(data) {
    return this.http
      .post(this.config.apiUrl + "applications/delete", data, {
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

  updateMenu(data) {
    return this.http
      .post(this.config.apiUrl + "applications/editMenu", data, {
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

  getApplicationRole(applicationId) {
    return this.http
      .get(this.config.apiUrl + "applications/role/" + applicationId, {
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

  addApplicationRole(data) {
    return this.http
      .post(this.config.apiUrl + "applications/role", data, {
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

  activatedAppRole(data) {
    return this.http
      .post(this.config.apiUrl + "applications/role/activated", data, {
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

  deleteAppRole(data) {
    return this.http
      .post(this.config.apiUrl + "applications/role/delete", data, {
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
