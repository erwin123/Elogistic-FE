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

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  ls = new SecureLS();

  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.ls.get("loggedUM")) {
      this.router.navigate(["login"]);
      return false;
    }
    try {
      this.ls.get("loggedUM");
      return true;
    } catch (error) {
      this.ls.remove("loggedUM");
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
    if (!this.ls.get("loggedUM")) {
      this.router.navigate(["login"]);
      return false;
    }
    try {
      this.ls.get("loggedUM");
      return true;
    } catch (error) {
      this.ls.remove("loggedUM");
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
