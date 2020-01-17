import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { ConfigService } from "src/app/services/config.service";

@Component({
  selector: "app-list-user-project",
  templateUrl: "./list-user-project.component.html",
  styleUrls: ["./list-user-project.component.scss"]
})
export class ListUserProjectComponent implements OnInit {
  ls = new SecureLS();
  userProject;
  listUserProject = [];

  constructor(
    private route: Router,
    private userServices: UsersService,
    private config: ConfigService
  ) {
    if (!this.ls.get("userProjectId")) {
      this.route.navigate(["./landing/list-project"]);
    }
    try {
      this.userProject = this.ls.get("userProjectId");
      this.getUserProject();
    } catch (error) {
      this.route.navigate(["./landing/list-job"]);
    }
  }

  ngOnInit() {}

  getUserProject() {
    this.listUserProject = [];
    this.config.setFloading(true);
    this.userServices
      .getUserProject({ plant_code: this.userProject.plant_code })
      .subscribe(
        (response: any) => {
          this.config.setFloading(false);
          if (response.status == false) {
            this.config.errorMessage(JSON.stringify(response));
          } else {
            this.listUserProject = response.data;
          }
        },
        error => {
          this.config.errorMessage(JSON.stringify(error));
          this.config.setFloading(false);
        }
      );
  }

  activeDeactiveUserProject(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Activate User " + data.username
          : "Active User " + data.username,
        "info"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.userServices
            .activatedUserProject({
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
                  this.getUserProject();
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

  deleteUserProject(data) {
    this.config
      .promptMessage("Are you sure?", "Delete User " + data.username, "warning")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.userServices
            .deleteUserProject({
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
                  this.getUserProject();
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
