import { Injectable, EventEmitter, Output } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import swal from "sweetalert";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { take } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { formatDate } from "@angular/common";
import * as SecureLS from "secure-ls";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class GlobalServiceService {
  @Output() fLoading: EventEmitter<Boolean> = new EventEmitter(false);
  // readonly apiUrl: string = "https://stg-api-elogistic.acset.co/";
  // readonly apiUrlLogin: string = "https://stg-api-um-elogistic.acset.co/";
  apiElasticSearch: string = "";
  apiUrl: string = "";
  apiUrlLogin: string = "";
  indexNameElasticsearch: string = "";
  currentMessage = new BehaviorSubject(null);
  tokenFcm;
  applicationId = 0;
  ls = new SecureLS();

  constructor(
    private http: HttpClient,
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging,
    private route: Router
  ) {
    this.setFloading(true);
    this.http
      .get(window.location.origin + "/assets/data/config.json")
      .toPromise()
      .then((data: any) => {
        this.apiUrl = data.api_url;
        this.apiElasticSearch = data.api_elastic_search;
        this.apiUrlLogin = data.api_url_login;
        this.indexNameElasticsearch = data.index_name_elastic_search;
        this.applicationId = data.application_id;
		this.setFloading(false);
      })
      .catch(error => {
        this.errorMessage(error);
        this.setFloading(false);
      });
    this.angularFireMessaging.messaging.subscribe(_messaging => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    });
  }

  createAuthorizationHeader() {
    let headers = new HttpHeaders().set(
      "Authorization",
      this.getUserLogin().data.token
    );
    return headers;
  }

  getArticlesByApp() {
    return this.http
      .get(this.apiUrlLogin + "articles/byApp/" + this.applicationId, {
        headers: this.createAuthorizationHeader(),
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
  setFloading(value) {
    this.fLoading.emit(value);
  }

  getFloading() {
    return this.fLoading;
  }

  getData(route: string) {
    return this.http.get(this.apiUrl + route);
  }

  postData(route: string, data: any) {
    return this.http.post(this.apiUrl + route, data);
  }

  openSnackBarErrorHttpReq(error: any) {
    if (error.status == 401) {
      this.forceLogout();
    } else {
      swal("ERROR!", JSON.stringify(error), "error");
    }
  }

  errorMessage(message: string) {
    swal("ERROR!", message, "error");
  }

  successMessage(title: string, message: string) {
    swal(title, message, "success");
  }

  infoMessage(title: string, message: string) {
    swal(title, message, "info");
  }

  warningMessage(title: string, message: string) {
    swal(title, message, "warning");
  }

  promptMessage(title: string, message: string, icon: string) {
    return swal(title, message, icon, { buttons: ["Cancel", true] }).then(
      res => {
        if (res) {
          return true;
        } else {
          return false;
        }
      }
    );
  }

  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(() => {
      const data = {};
      data[userId] = token;
      this.angularFireDB.object("fcmTokens/").update(data);
    });
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      token => {
        this.tokenFcm = token;
        // console.log(token);
        // this.updateToken(userId, token);
      },
      err => {
        console.error("Unable to get permission to notify.", err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(payload => {
      // console.log("new message received. ", payload);
      this.currentMessage.next(payload);
    });
  }

  sqlServerDate(date) {
    return formatDate(date, "yyyy-MM-dd", "en-US").toString();
  }

  getUserLogin() {
    return this.ls.get("loggedElogistik");
  }

  popupImage(title, imgUrl) {
    swal({
      title: title,
      text: "",
      content: {
        element: "img",
        attributes: {
          src: imgUrl,
          style: "width:255px;"
        }
      }
    });
  }

  setLs(key, value) {
    this.ls.set(key, value);
  }

  getLs(key) {
    return this.ls.get(key);
  }

  removeLs(key) {
    this.ls.remove(key);
  }

  removeAllLs() {
    this.ls.removeAll();
  }

  forceLogout() {
    this.setFloading(false);
    this.errorMessage("Token expired, please login again!");
    this.ls.removeAll();
    this.route.navigate(["login"]);
  }
}
