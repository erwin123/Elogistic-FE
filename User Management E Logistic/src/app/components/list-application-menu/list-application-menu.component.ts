import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { ConfigService } from "src/app/services/config.service";
import { ApplicationsService } from "src/app/services/applications.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-application-menu",
  templateUrl: "./list-application-menu.component.html",
  styleUrls: ["./list-application-menu.component.scss"]
})
export class ListApplicationMenuComponent implements OnInit {
  ls = new SecureLS();
  application;
  listApplicationMenu = [];
  showModalEditMenu: Boolean = false;
  detailMenu;

  constructor(
    private config: ConfigService,
    private applicationServices: ApplicationsService,
    private route: Router
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

  activeDeactiveApplicationMenu(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Activate Menu " + data.application_name
          : "Active Menu " + data.application_name,
        "info"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.applicationServices
            .activatedMenu({
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

  deleteApplicationMenu(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        "Delete Menu " + data.application_name,
        "warning"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.applicationServices
            .deleteMenu({
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

  modalEditApplicationMenu(data) {
    this.detailMenu = null;
    this.detailMenu = data;
    this.showModalEditMenu = true;
  }

  updateMenu() {
    this.config.promptMessage("Are you sure?", "", "info").then(res => {
      if (res == true) {
        this.detailMenu.updated_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.config.setFloading(true);
        this.applicationServices.updateMenu(this.detailMenu).subscribe(
          (response: any) => {
            this.config.setFloading(false);
            if (response.status == false) {
              this.config.errorMessage(JSON.stringify(response));
              this.showModalEditMenu = false;
            } else {
              this.config.successMessage("SAVE", "Success!");
              this.showModalEditMenu = false;
              this.getApplicationMenu();
            }
          },
          error => {
            this.config.errorMessage(JSON.stringify(error));
            this.config.setFloading(false);
            this.showModalEditMenu = false;
          }
        );
      }
    });
  }

  showApplicationRole(data) {
    this.ls.remove("menuId");
    this.ls.set("menuId", data);
    this.route.navigate(["./landing/list-application-role"]);
  }
}
