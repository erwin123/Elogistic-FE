import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as SecureLS from "secure-ls";
import { LoginService } from "src/app/services/login.service";
import { ConfigService } from "src/app/services/config.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  isCollaps = true;
  ls = new SecureLS();
  listMenu = this.ls.get("loggedUM").profileMenu;
  userLogin = this.ls.get("loggedUM").profileUser[0];
  width = window.innerWidth > 0 ? window.innerWidth : screen.width;

  constructor(
    private route: Router,
    private logoutService: LoginService,
    private config: ConfigService
  ) {}

  ngOnInit() {}

  logout() {
    this.config.setFloading(true);
    this.logoutService
      .logoutService({
        id: this.ls.get("loggedUM").profileUser[0].id,
        application_id: 1
      })
      .subscribe(
        response => {
          this.config.setFloading(false);
          if (response.status == false) {
            this.config.errorMessage(response.message);
          } else {
            this.ls.removeAll();
            this.route.navigate(["./login"]);
          }
        },
        error => {
          this.config.setFloading(false);
          this.config.errorMessage(JSON.stringify(error));
        }
      );
  }
}
