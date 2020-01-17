import { Component, OnInit } from "@angular/core";
import { ConfigService } from "src/app/services/config.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-add-user-area",
  templateUrl: "./add-user-area.component.html",
  styleUrls: ["./add-user-area.component.scss"]
})
export class AddUserAreaComponent implements OnInit {
  lsUserArea;
  username = "";
  showModalUser: Boolean = false;
  listUser = [];
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

  submit() {
    if (!this.lsUserArea.user_id) {
      this.config.infoMessage("REQUIRED!", "User cannot be empty!");
      return false;
    }
    this.config
      .promptMessage(
        "SAVE!",
        "Are you sure add " + this.username + " ?",
        "info"
      )
      .then(res => {
        if (res == true) {
          this.lsUserArea.created_by = this.config.getUserLogin().profileUser[0].username;
          this.config.setFloading(true);
          this.usersService.addUserInPrjZoneArea(this.lsUserArea).subscribe(
            (response: any) => {
              if (response.status == false) {
                this.config.setFloading(false);
                this.config.errorMessage(response.message);
              } else {
                this.config.setFloading(false);
                this.lsUserArea.id = null;
                this.lsUserArea.created_by = null;
                this.config.successMessage("SUCCESS", "Add user success!");
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

  getUser() {
    this.listUser = [];
    this.config.setFloading(true);
    this.usersService.getUser().subscribe(
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
    this.lsUserArea.user_id = null;
    this.username = "";
    let existUser = [];
    existUser = this.listUserArea.filter(element => {
      if (data.username == element.username) {
        return true;
      }
    });
    if (existUser.length > 0) {
      this.config.infoMessage("INFO", "User has been added!");
      this.showModalUser = false;
      return false;
    }
    this.lsUserArea.user_id = data.id;
    this.username = data.username;
    this.showModalUser = false;
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
