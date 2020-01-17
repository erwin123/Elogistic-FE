import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalServiceService } from "./global-service.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  constructor(
    private http: HttpClient,
    private services: GlobalServiceService
  ) {}

  getProject() {
    return this.http
      .get(this.services.apiUrl + "projects", {
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

  getTop10Material(data) {
    if (data.filter == "1") {
      return this.http
        .post(this.services.apiUrl + "materials/top10ByQuantity", data, {
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
    } else {
      return this.http
        .post(this.services.apiUrl + "materials/top10ByAmount", data, {
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

  getOutgoingMaterial(data) {
    return this.http
      .post(this.services.apiUrl + "materials/outgoing", data, {
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

  getMaterialRecieve(data) {
    return this.http
      .post(this.services.apiUrl + "materials/reportMaterialRecieve", data, {
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

  getTop10MaterialEmptyStock(data) {
    if (data.filter == "1") {
      return this.http
        .post(
          this.services.apiUrl + "materials/top10EmptyStockByQuantity",
          data,
          {
            headers: this.services.createAuthorizationHeader(),
            observe: "response"
          }
        )
        .pipe(
          map(res => {
            if (res.status == 200) {
              return res.body;
            }
          })
        );
    } else {
      return this.http
        .post(
          this.services.apiUrl + "materials/top10EmptyStockByOrderAmount",
          data,
          {
            headers: this.services.createAuthorizationHeader(),
            observe: "response"
          }
        )
        .pipe(
          map(res => {
            if (res.status == 200) {
              return res.body;
            }
          })
        );
    }
  }

  getEmptyStockMaterial(data) {
    return this.http
      .post(this.services.apiUrl + "materials/emptyStock", data, {
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

  getOutstandingRecieve(data) {
    return this.http
      .post(this.services.apiUrl + "orders/outstandingRecieve", data, {
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

  getSlocByProjectId(data) {
    return this.http
      .post(this.services.apiUrl + "materials/getSlocByProjectId", data, {
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

  getStock(data) {
    return this.http
      .post(this.services.apiUrl + "materials/byProjectAndSloc", data, {
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

  getReportOrder(data) {
    return this.http
      .post(this.services.apiUrl + "materials/requestOrder", data, {
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

  getVBarReportOrder(data) {
    return this.http
      .post(this.services.apiUrl + "materials/vBarRequestOrder", data, {
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
