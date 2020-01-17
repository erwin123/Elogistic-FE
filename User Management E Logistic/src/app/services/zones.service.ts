import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ZonesService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  addZone(data) {
    return this.http
      .post(this.config.apiUrlElogistik + "zones", data, {
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

  getZones() {
    return this.http
      .get(this.config.apiUrlElogistik + "zones", {
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

  activatedZone(data) {
    return this.http
      .post(this.config.apiUrlElogistik + "zones/activated", data, {
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

  deleteZone(data) {
    return this.http
      .post(this.config.apiUrlElogistik + "zones/delete", data, {
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

  updateZone(data) {
    return this.http
      .post(this.config.apiUrlElogistik + "zones/edit", data, {
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

  getZoneProject(zoneId) {
    return this.http
      .get(this.config.apiUrlElogistik + "zones/byZone/" + zoneId, {
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

  activatedZoneProject(data) {
    return this.http
      .post(this.config.apiUrlElogistik + "zones/project/activated", data, {
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

  deleteZoneProject(data) {
    return this.http
      .post(this.config.apiUrlElogistik + "zones/project/delete", data, {
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

  addZoneProject(data) {
    return this.http
      .post(this.config.apiUrlElogistik + "zones/project", data, {
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

  getZoneByProjectId(projectId) {
    return this.http
      .get(this.config.apiUrlElogistik + "zones/project/" + projectId, {
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
