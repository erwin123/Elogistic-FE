import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { UsersService } from "src/app/services/users.service";
import { ConfigService } from "src/app/services/config.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-user-project-zone",
  templateUrl: "./add-user-project-zone.component.html",
  styleUrls: ["./add-user-project-zone.component.scss"]
})
export class AddUserProjectZoneComponent implements OnInit {
  ls = new SecureLS();
  userProjectZone;
  listUser = [];
  listUserProjectZone = [];
  showModalUser: Boolean = false;
  username;
  user;

  constructor(
    private route: Router,
    private config: ConfigService,
    private userServices: UsersService
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

  getUser() {
    this.listUser = [];
    this.config.setFloading(true);
    this.userServices.getUser().subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listUser = response.data;
          this.showModalUser = true;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  setUser(data) {
    this.user = null;
    this.username = "";
    let flagExistsUser: Boolean = false;
    this.listUserProjectZone.forEach(element => {
      if (element.username == data.username) {
        flagExistsUser = true;
      }
    });
    if (flagExistsUser == true) {
      this.config.infoMessage("INFO", "User has been added!");
      this.showModalUser = false;
      return false;
    }
    this.user = data;
    this.username = data.username;
    this.showModalUser = false;
  }

  submit() {
    if (!this.username) {
      this.config.infoMessage("REQUIRED", "User cannot be empty!");
      return false;
    }
    let data = {
      user_id: this.user.id,
      plant_code: this.userProjectZone.plant_code,
      zone_id: this.userProjectZone.zone_id,
      created_by: this.ls.get("loggedUM").profileUser[0].username
    };
    this.config
      .promptMessage("SAVE", "Are you sure add " + this.username + " ?", "info")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.userServices.addUserProjectZone(data).subscribe(
            (response: any) => {
              this.config.setFloading(false);
              if (response.status == false) {
                this.config.errorMessage(JSON.stringify(response));
                return false;
              } else {
                this.config.successMessage("SAVE", "Add user success!");
                this.user = null;
                this.username = "";
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
