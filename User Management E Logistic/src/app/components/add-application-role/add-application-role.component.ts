import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { ConfigService } from "src/app/services/config.service";
import { ApplicationsService } from "src/app/services/applications.service";
import { Router } from "@angular/router";
import { RolesService } from "src/app/services/roles.service";

@Component({
  selector: "app-add-application-role",
  templateUrl: "./add-application-role.component.html",
  styleUrls: ["./add-application-role.component.scss"]
})
export class AddApplicationRoleComponent implements OnInit {
  ls = new SecureLS();
  application;
  listApplicationRole = [];
  rolename = "";
  listRole = [];
  showModalRole: Boolean = false;
  role = null;

  constructor(
    private config: ConfigService,
    private applicationServices: ApplicationsService,
    private route: Router,
    private roleServices: RolesService
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

  getRole() {
    this.listRole = [];
    this.config.setFloading(true);
    this.roleServices.getRole().subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listRole = response.data;
          this.showModalRole = true;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

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

  setRole(data) {
    this.role = null;
    this.rolename = "";
    let flagExistsRole = false;
    this.listApplicationRole.forEach(element => {
      if (data.role_code == element.role_code) {
        flagExistsRole = true;
      }
    });
    if (flagExistsRole) {
      this.config.infoMessage("INFO", "Role has been added.");
      this.showModalRole = false;
      return false;
    }
    this.rolename = data.role_desc;
    this.role = data;
    this.showModalRole = false;
  }

  submit() {
    if (!this.rolename) {
      this.config.infoMessage("REQUIRED", "Role cannot be empty!");
      return false;
    }
    let data = {
      application_id: this.application.id,
      role_id: this.role.id,
      created_by: this.ls.get("loggedUM").profileUser[0].username
    };
    this.config
      .promptMessage("SAVE", "Are you sure add " + this.rolename + " ?", "info")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.applicationServices.addApplicationRole(data).subscribe(
            (response: any) => {
              this.config.setFloading(false);
              if (response.status == false) {
                this.config.errorMessage(JSON.stringify(response));
                return false;
              } else {
                this.config.successMessage("SAVE", "Add role success!");
                this.role = null;
                this.rolename = "";
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
