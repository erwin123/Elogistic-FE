import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RolesService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  getRole() {
    return this.http
      .get(this.config.apiUrl + "roles", {
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

  addRole(data) {
    return this.http
      .post(this.config.apiUrl + "roles", data, {
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

  activatedRole(data) {
    return this.http
      .post(this.config.apiUrl + "roles/activated", data, {
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

  deleteRole(data) {
    return this.http
      .post(this.config.apiUrl + "roles/delete", data, {
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

  updateRole(data) {
    return this.http
      .post(this.config.apiUrl + "roles/edit", data, {
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

  getRoleJob(roleId) {
    return this.http
      .get(this.config.apiUrl + "roles/job/" + roleId, {
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

  addRoleJob(data) {
    return this.http
      .post(this.config.apiUrl + "roles/job", data, {
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

  activatedRoleJob(data) {
    return this.http
      .post(this.config.apiUrl + "roles/job/activated", data, {
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

  deleteRoleJob(data) {
    return this.http
      .post(this.config.apiUrl + "roles/job/delete", data, {
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
