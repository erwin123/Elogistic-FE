import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import * as SecureLS from "secure-ls";
import { HttpClient } from "@angular/common/http";
import { GlobalServiceService } from "./services/global-service.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  ls = new SecureLS();

  constructor(
    private services: GlobalServiceService,
    private router: Router,
    private http: HttpClient
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.ls.get("loggedElogistik")) {
      this.router.navigate(["login"]);
      return false;
    }
    try {
      this.ls.get("loggedElogistik");
      return true;
    } catch (error) {
      this.services.infoMessage("Alert!", "Unautorized access!");
      this.ls.remove("loggedElogistik");
      this.router.navigate(["login"]);
      return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.ls.get("loggedElogistik")) {
      this.router.navigate(["login"]);
      return false;
    }
    try {
      this.ls.get("loggedElogistik");
      return true;
    } catch (error) {
      this.services.infoMessage("Alert!", "Unautorized access!");
      this.ls.remove("loggedElogistik");
      this.router.navigate(["login"]);
      return false;
    }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
