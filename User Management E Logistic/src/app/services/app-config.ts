import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfigUrl } from "../entity/index";
@Injectable()
export class AppConfig {
  static config: AppConfigUrl;
  constructor(private http: HttpClient) {}
  load() {
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(window.location.origin + "/assets/data/config.json")
        .toPromise()
        .then((data: any) => {
          AppConfig.config = data;
          resolve();
        })
        .catch(error => {
          reject("Cannot load config");
        });
    });
  }
}
