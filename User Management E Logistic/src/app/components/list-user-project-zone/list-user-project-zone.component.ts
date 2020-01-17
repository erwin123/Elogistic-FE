import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { ConfigService } from "src/app/services/config.service";

@Component({
  selector: "app-list-user-project-zone",
  templateUrl: "./list-user-project-zone.component.html",
  styleUrls: ["./list-user-project-zone.component.scss"]
})
export class ListUserProjectZoneComponent implements OnInit {
  ls = new SecureLS();
  userProjectZone;
  listUserProjectZone = [];

  constructor(
    private route: Router,
    private userServices: UsersService,
    private config: ConfigService
  ) {
    if (!this.ls.get("userZone")) {
      this.route.navigate(["./landing/list-zone-project"]);
    }
    try {
      this.userProjectZone = this.ls.get("userZone");
      this.getUserProjectZone();
    } catch (error) {
      this.route.navigate(["./landing/list-zone-project"]);
    }
  }

  ngOnInit() {}

  getUserProjectZone() {
    this.listUserProjectZone = [];
    this.config.setFloading(true);
    this.userServices
      .getUserProjectZone({
        plant_code: this.userProjectZone.plant_code,
        zone_id: this.userProjectZone.zone_id
      })
      .subscribe(
        (response: any) => {
          this.config.setFloading(false);
          if (response.status == false) {
            this.config.errorMessage(JSON.stringify(response));
          } else {
            this.listUserProjectZone = response.data;
          }
        },
        error => {
          this.config.errorMessage(JSON.stringify(error));
          this.config.setFloading(false);
        }
      );
  }

  activeDeactiveUserProjectZone(data) {
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
            .activatedUserProjectZone({
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
                  this.getUserProjectZone();
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

  deleteUserProjectZone(data) {
    this.config
      .promptMessage("Are you sure?", "Delete User " + data.username, "warning")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.userServices
            .deleteUserProjectZone({
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
                  this.getUserProjectZone();
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
