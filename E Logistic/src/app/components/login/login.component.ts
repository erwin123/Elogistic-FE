import { Component, OnInit, OnDestroy } from "@angular/core";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { ParamLogin } from "src/app/entity/global-entity";
import { Router } from "@angular/router";
import * as SecureLS from "secure-ls";
import { UsersService } from "src/app/services/users.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  user: ParamLogin = new ParamLogin();
  errorMessage: String = "";
  ls = new SecureLS();
  hide: Boolean = true;
  private destroyed$ = new Subject<void>();

  constructor(
    private services: GlobalServiceService,
    private router: Router,
    private loginService: UsersService
  ) {}

  ngOnInit() {
    this.services.requestPermission();
    if (this.ls.get("loggedElogistik")) {
      try {
        this.ls.get("loggedElogistik");
        this.router.navigate(["./landing/home"]);
      } catch (error) {
        this.ls.remove("loggedElogistik");
      }
    }
  }

  login() {
    if (!this.user.Username) {
      this.services.infoMessage("Required", "Username cannot be empty!.");
      return false;
    }

    if (!this.user.Username.trim()) {
      this.services.infoMessage("Required", "Username cannot be empty!.");
      return false;
    }

    if (!this.user.Password) {
      this.services.infoMessage("Required", "Password cannot be empty!.");
      return false;
    }

    if (!this.user.Password.trim()) {
      this.services.infoMessage("Required", "Password cannot be empty!.");
      return false;
    }
    this.services.setFloading(true);
    this.errorMessage = "";
    this.loginService
      .loginUser("users/login", {
        username: this.user.Username,
        password: this.user.Password,
        token_fcm: this.services.tokenFcm ? this.services.tokenFcm : "",
        application_id: this.services.applicationId
      })
      .subscribe(
        (response: any) => {
          if (response) {
            if (response.status == false) {
              this.errorMessage = response.message;
              this.services.setFloading(false);
            } else {
              this.ls.set("loggedElogistik", response);
              this.services.setFloading(false);
              this.router.navigate(["./landing/home"]);
            }
          } else {
            this.services.setFloading(false);
            this.errorMessage = "Connection problem, please try again letter!";
          }
        },
        error => {
          this.services.setFloading(false);
          this.services.openSnackBarErrorHttpReq(error);
        }
      );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
