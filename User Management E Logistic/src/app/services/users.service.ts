import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  getUser() {
    return this.http
      .get(this.config.apiUrl + "users", {
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

  getUserDetail(userId) {
    return this.http
      .get(this.config.apiUrl + "users/" + userId, {
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

  addUser(data) {
    return this.http
      .post(this.config.apiUrl + "users", data, {
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

  activatedUser(data) {
    return this.http
      .post(this.config.apiUrl + "users/activated", data, {
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

  deleteUser(data) {
    return this.http
      .post(this.config.apiUrl + "users/delete", data, {
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

  updateUser(data) {
    return this.http
      .post(this.config.apiUrl + "users/edit", data, {
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

  changePassword(data) {
    return this.http
      .post(this.config.apiUrl + "users/changePassword", data, {
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

  getUserProject(data) {
    return this.http
      .post(this.config.apiUrl + "users/project", data, {
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

  activatedUserProject(data) {
    return this.http
      .post(this.config.apiUrl + "users/project/activated", data, {
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

  deleteUserProject(data) {
    return this.http
      .post(this.config.apiUrl + "users/project/delete", data, {
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

  addUserProject(data) {
    return this.http
      .post(this.config.apiUrl + "users/project/add", data, {
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

  getUserProjectZone(data) {
    return this.http
      .post(this.config.apiUrl + "users/project/zone", data, {
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

  addUserProjectZone(data) {
    return this.http
      .post(this.config.apiUrl + "users/project/zone/add", data, {
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

  activatedUserProjectZone(data) {
    return this.http
      .post(this.config.apiUrl + "users/project/zone/activated", data, {
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

  deleteUserProjectZone(data) {
    return this.http
      .post(this.config.apiUrl + "users/project/zone/delete", data, {
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

  getUserSloc() {
    return this.http
      .get(this.config.apiUrlElogistik + "materials/getSlocProject", {
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

  getListUserLoginAppsByUserId(userId) {
    return this.http
      .get(this.config.apiUrl + "users/loginApps/" + userId, {
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

  logoutUserFromApp(loginId) {
    return this.http
      .delete(this.config.apiUrl + "users/logout/" + loginId, {
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

  getUserInPrjZoneArea(data) {
    return this.http
      .post(this.config.apiUrl + "users/project/zone/area", data, {
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

  addUserInPrjZoneArea(data) {
    return this.http
      .post(this.config.apiUrl + "users/project/zone/area/add", data, {
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

  activeDeactiveUserInPrjZoneArea(data) {
    return this.http
      .post(this.config.apiUrl + "users/project/zone/area/active", data, {
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

  deleteUserInPrjZoneArea(data) {
    return this.http
      .post(this.config.apiUrl + "users/project/zone/area/delete", data, {
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
