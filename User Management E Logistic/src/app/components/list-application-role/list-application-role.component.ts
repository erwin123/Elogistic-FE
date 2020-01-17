import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { ConfigService } from "src/app/services/config.service";
import { ApplicationsService } from "src/app/services/applications.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-application-role",
  templateUrl: "./list-application-role.component.html",
  styleUrls: ["./list-application-role.component.scss"]
})
export class ListApplicationRoleComponent implements OnInit {
  ls = new SecureLS();
  application;
  listApplicationRole = [];

  constructor(
    private config: ConfigService,
    private applicationServices: ApplicationsService,
    private route: Router
  ) {
    if (!this.ls.get("menuId")) {
      this.route.navigate(["./landing/list-application-menu"]);
    }
    try {
      this.application = this.ls.get("menuId");
      this.getApplicationRole();
    } catch (error) {
      this.route.navigate(["./landing/list-application-menu"]);
    }
  }

  ngOnInit() {}

  getApplicationRole() {
    this.listApplicationRole = [];
    this.config.setFloading(true);
    this.applicationServices.getApplicationRole(this.application.id).subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listApplicationRole = response.data;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  activeDeactiveApplicationRole(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Activate Role " + data.role_desc
          : "Active Role " + data.role_desc,
        "info"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.applicationServices
            .activatedAppRole({
              id: data.id,
              is_active: data.is_active == 1 ? 0 : 1,
              updated_by: this.ls.get("loggedUM").profileUser[0].username
            })
            .subscribe(
              (response: any) => {
                this.config.setFloading(false);
                if (response.status == false) {
                  this.config.errorMessage(JSON.stringify(response));
                } else {
                  this.config.successMessage("SAVE", "Success!");
                  this.getApplicationRole();
                }
              },
              error => {
                this.config.errorMessage(JSON.stringify(error));
                this.config.setFloading(false);
              }
            );
        }
      });
  }

  deleteApplicationRole(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        "Delete Role " + data.role_desc,
        "warning"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.applicationServices
            .deleteAppRole({
              id: data.id,
              updated_by: this.ls.get("loggedUM").profileUser[0].username
            })
            .subscribe(
              (response: any) => {
                this.config.setFloading(false);
                if (response.status == false) {
                  this.config.errorMessage(JSON.stringify(response));
                } else {
                  this.config.successMessage("SAVE", "Success!");
                  this.getApplicationRole();
                }
              },
              error => {
                this.config.errorMessage(JSON.stringify(error));
                this.config.setFloading(false);
              }
            );
        }
      });
  }
}
