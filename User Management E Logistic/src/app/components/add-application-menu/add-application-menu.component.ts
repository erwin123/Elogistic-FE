import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/services/config.service";
import { ApplicationsService } from "src/app/services/applications.service";

@Component({
  selector: "app-add-application-menu",
  templateUrl: "./add-application-menu.component.html",
  styleUrls: ["./add-application-menu.component.scss"]
})
export class AddApplicationMenuComponent implements OnInit {
  ls = new SecureLS();
  application;
  menuName = "";
  routeMenu = "";
  icon = "";
  listApplicationMenu = [];

  constructor(
    private route: Router,
    private config: ConfigService,
    private applicationServices: ApplicationsService
  ) {
    if (!this.ls.get("applicationId")) {
      this.route.navigate(["./landing/list-applications"]);
    }
    try {
      this.application = this.ls.get("applicationId");
      this.getApplicationMenu();
    } catch (error) {
      this.route.navigate(["./landing/list-applications"]);
    }
  }

  ngOnInit() {}

  submit() {
    if (!this.menuName) {
      this.config.infoMessage("REQUIRED", "Menu cannot be empty!");
      return false;
    }

    let flagExistsMenu = false;
    this.listApplicationMenu.forEach(element => {
      if (
        element.application_name.toLowerCase() == this.menuName.toLowerCase()
      ) {
        flagExistsMenu = true;
      }
    });

    if (flagExistsMenu) {
      this.config.infoMessage("INFO", "Menu has been added!");
      return false;
    }
    let data = {
      application_name: this.menuName,
      parent_id: this.application.id,
      application_id: this.application.id,
      route: this.routeMenu,
      icon: this.icon,
      created_by: this.ls.get("loggedUM").profileUser[0].username
    };

    this.config
      .promptMessage("SAVE", "Are you sure add " + this.menuName + " ?", "info")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.applicationServices.addMenu(data).subscribe(
            (response: any) => {
              this.config.setFloading(false);
              if (response.status == false) {
                this.config.errorMessage(JSON.stringify(response));
                return false;
              } else {
                this.config.successMessage("SAVE", "Add menu success!");
                this.menuName = "";
                this.routeMenu = "";
                this.icon = "";
                this.getApplicationMenu();
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

  getApplicationMenu() {
    this.listApplicationMenu = [];
    this.config.setFloading(true);
    this.applicationServices.getApplicationMenu(this.application.id).subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listApplicationMenu = response.data;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }
}
