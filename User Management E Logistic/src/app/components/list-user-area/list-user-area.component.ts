import { Component, OnInit } from "@angular/core";
import { ConfigService } from "src/app/services/config.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-list-user-area",
  templateUrl: "./list-user-area.component.html",
  styleUrls: ["./list-user-area.component.scss"]
})
export class ListUserAreaComponent implements OnInit {
  lsUserArea;
  listUserArea = [];

  constructor(
    private config: ConfigService,
    private usersService: UsersService
  ) {
    this.getLsUserArea();
  }

  ngOnInit() {}

  async getLsUserArea() {
    this.lsUserArea = await this.config.getLs(
      "areaUserId",
      "./landing/list-area"
    );
    await this.getUserInProjectZoneAndArea();
  }

  activeDeactiveUserArea(data) {
    this.config
      .promptMessage(
        data.is_active == 1
          ? "Deactive user " + data.username
          : "Active user " + data.username,
        "Are you sure?",
        "info"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          data.updated_by = this.config.getUserLogin().profileUser[0].username;
          data.is_active = data.is_active == 1 ? 0 : 1;
          this.usersService.activeDeactiveUserInPrjZoneArea(data).subscribe(
            (response: any) => {
              if (response.status == false) {
                this.config.errorMessage(response.message);
                this.config.setFloading(false);
              } else {
                data.updated_by = null;
                data.is_active = null;
                this.config.successMessage("SUCCESS", response.message);
                this.getUserInProjectZoneAndArea();
              }
            },
            error => {
              this.config.errorMessage(JSON.stringify(error));
            }
          );
        }
      });
  }

  deleteUserArea(data) {
    this.config
      .promptMessage("Delete user " + data.username, "Are you sure?", "warning")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          data.updated_by = this.config.getUserLogin().profileUser[0].username;
          this.usersService.deleteUserInPrjZoneArea(data).subscribe(
            (response: any) => {
              if (response.status == false) {
                this.config.errorMessage(response.message);
                this.config.setFloading(false);
              } else {
                data.updated_by = null;
                this.config.successMessage("SUCCESS", response.message);
                this.getUserInProjectZoneAndArea();
              }
            },
            error => {
              this.config.errorMessage(JSON.stringify(error));
            }
          );
        }
      });
  }

  async getUserInProjectZoneAndArea() {
    this.config.setFloading(true);
    this.listUserArea = [];
    this.usersService.getUserInPrjZoneArea(this.lsUserArea).subscribe(
      (response: any) => {
        if (response.status == false) {
          this.config.errorMessage(response.message);
        } else {
          this.config.setFloading(false);
          this.listUserArea = response.data;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
      }
    );
  }
}
