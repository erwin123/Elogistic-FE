import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class JobsService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  getJob() {
    return this.http
      .get(this.config.apiUrl + "jobs", {
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

  addJob(data) {
    return this.http
      .post(this.config.apiUrl + "jobs", data, {
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

  activatedJob(data) {
    return this.http
      .post(this.config.apiUrl + "jobs/activated", data, {
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

  deleteJob(data) {
    return this.http
      .post(this.config.apiUrl + "jobs/delete", data, {
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

  updateJob(data) {
    return this.http
      .post(this.config.apiUrl + "jobs/edit", data, {
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

  getUsersJob(jobId) {
    return this.http
      .get(this.config.apiUrl + "jobs/users/" + jobId, {
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

  addUserJob(data) {
    return this.http
      .post(this.config.apiUrl + "jobs/user", data, {
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

  activatedUserJob(data) {
    return this.http
      .post(this.config.apiUrl + "jobs/user/activated", data, {
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

  deleteUserJob(data) {
    return this.http
      .post(this.config.apiUrl + "jobs/user/delete", data, {
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
