import { Injectable, EventEmitter, Output } from "@angular/core";
import swal from "sweetalert";
import { formatDate } from "@angular/common";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { AppConfig } from "./app-config";

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  apiLoginUrl: string = AppConfig.config.api_login_url;
  apiUrl: string = AppConfig.config.api_url;
  apiUrlElogistik: string = AppConfig.config.api_elogistic;
  applicationId = AppConfig.config.application_id;
  ls = new SecureLS();
  @Output() fLoading: EventEmitter<Boolean> = new EventEmitter(false);

  constructor(private router: Router, private route: Router) {}

  errorMessage(message: string) {
    try {
      let error = JSON.parse(message);
      if (error.status == 401) {
        this.forceLogout();
      } else {
        swal("ERROR!", message, "error");
      }
    } catch (error) {
      swal("ERROR!", message, "error");
    }
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
  setFloading(value) {
    this.fLoading.emit(value);
  }

  getFloading() {
    return this.fLoading;
  }

  sqlServerDate(date) {
    return formatDate(date, "yyyy-MM-dd", "en-US").toString();
  }

  clarityDate(date) {
    return formatDate(date, "MM/dd/yyyy", "en-US").toString();
  }

  getLs(lsName, redirectPath) {
    let lsData;
    try {
      if (!this.ls.get(lsName)) {
        this.ls.remove(lsName);
        this.router.navigate([redirectPath]);
        return false;
      }
      lsData = this.ls.get(lsName);
    } catch (error) {
      this.ls.remove(lsName);
      this.router.navigate([redirectPath]);
    }
    return lsData;
  }

  getUserLogin() {
    return this.ls.get("loggedUM");
  }

  httpHeaders() {
    let headers = new HttpHeaders().set(
      "Authorization",
      this.getUserLogin().token
    );
    return headers;
  }

  forceLogout() {
    this.setFloading(false);
    this.errorMessage("Token expired, please login again!");
    this.ls.removeAll();
    this.route.navigate(["login"]);
  }
}
