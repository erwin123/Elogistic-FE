import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalServiceService } from "./global-service.service";
import { map } from "rxjs/operators";
import {
  ElasticSearchQuery,
  ParamGetCountStock,
  ParamGetRecieveOrder
} from "../entity/global-entity";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private services: GlobalServiceService
  ) {}

  order(data) {
    return this.http
      .post(this.services.apiUrl + "orders", data, {
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

  getListOrderApproval(data) {
    return this.http
      .post(this.services.apiUrl + "orders/byProject", data, {
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

  getListPackingOrder(data) {
    return this.http
      .post(this.services.apiUrl + "orders/packingOrderByProject", data, {
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

  getDetailOrder(orderId) {
    return this.http
      .get(this.services.apiUrl + "orders/detail/" + orderId, {
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

  getMaterial(data) {
    return this.http
      .post(this.services.apiUrl + "materials/byProject", data, {
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

  getLastUpdateStock() {
    return this.http
      .get(this.services.apiUrl + "materials/lastUpdateStock", {
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

  prosessApproval(data) {
    return this.http
      .post(this.services.apiUrl + "orders/approvalProsess", data, {
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

  packingProsess(data) {
    return this.http
      .post(this.services.apiUrl + "orders/packingProsess", data, {
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

  getListDeliveryOrder(data) {
    return this.http
      .post(this.services.apiUrl + "orders/getDeliveryOrder", data, {
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

  getLocationDeliveryOrder(projectId) {
    return this.http
      .get(this.services.apiUrl + "orders/getLocation/" + projectId, {
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

  deliveryProsess(data) {
    return this.http
      .post(this.services.apiUrl + "orders/delivery", data, {
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

  getHistoryOrder(data) {
    return this.http
      .post(this.services.apiUrl + "orders/getHistoryOrder", data, {
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

  trackOrder(projectId) {
    return this.http
      .get(this.services.apiUrl + "orders/trackingOrder/" + projectId, {
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

  recieveOrder(data) {
    return this.http
      .post(this.services.apiUrl + "orders/recieveOrder", data, {
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

  printFNPB(data) {
    return this.http
      .post(this.services.apiUrl + "orders/printFNPB", data, {
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

  recheckCountPrint(orderId) {
    return this.http
      .get(this.services.apiUrl + "orders/getHistoryOrder/" + orderId, {
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

  checkIndexElasticSearch() {
    return this.http
      .head(
        this.services.apiElasticSearch + this.services.indexNameElasticsearch,
        { observe: "response" }
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  createIndexElasticSearch() {
    return this.http
      .put(
        this.services.apiElasticSearch + this.services.indexNameElasticsearch,
        null
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  countDataIndexElasticSearch() {
    return this.http
      .get(
        this.services.apiElasticSearch +
          this.services.indexNameElasticsearch +
          "/_count"
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  addDataFromDbToEs() {
    return this.http
      .put(this.services.apiUrl + "materials/elasticsearch/add/fromdb", null, {
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

  getMaterialFromEs(data: ElasticSearchQuery) {
    return this.http
      .post(
        this.services.apiElasticSearch +
          this.services.indexNameElasticsearch +
          "/_search",
        data,
        {}
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getCountStock(data: ParamGetCountStock) {
    return this.http
      .post(this.services.apiUrl + "materials/countStock", data, {
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

  getRecieveOrder(data: ParamGetRecieveOrder) {
    return this.http
      .post(this.services.apiUrl + "orders/getRecieveOrder", data, {
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

  getDetailRecieve(tr_recieve_order_id) {
    return this.http
      .get(
        this.services.apiUrl + "orders/getDetailRecieve/" + tr_recieve_order_id,
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

  getMaterialHasNotBeenSent(data) {
    return this.http
      .post(this.services.apiUrl + "materials/hasNotBeenSent", data, {
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
