import { Component, OnInit } from "@angular/core";
import { FormLogin } from "src/app/entity";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";
import * as SecureLS from "secure-ls";
import { ConfigService } from "src/app/services/config.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormLogin = new FormLogin();
  messageError: String = "";
  ls = new SecureLS();

  constructor(
    private services: LoginService,
    private route: Router,
    private config: ConfigService
  ) {
    this.checkLogin();
  }

  ngOnInit() {}

  login() {
    this.config.setFloading(true);
    this.form.application_id = this.config.applicationId;
    this.services.loginService(this.form).subscribe(
      response => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(response.message);
        } else {
          this.ls.set("loggedUM", response.data);
          this.route.navigate(["./landing/home"]);
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  checkLogin() {
    try {
      if (this.ls.get("loggedUM")) {
        this.ls.get("loggedUM");
        this.route.navigate(["./landing/home"]);
      }
    } catch (error) {
      this.ls.remove("loggedUM");
      this.route.navigate(["./login"]);
    }
  }
}
