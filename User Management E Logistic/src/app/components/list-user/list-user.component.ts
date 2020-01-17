import { Component, OnInit } from "@angular/core";
import { ConfigService } from "src/app/services/config.service";
import { UsersService } from "src/app/services/users.service";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-user",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.scss"]
})
export class ListUserComponent implements OnInit {
  listUser = [];
  showModalEditUser: Boolean = false;
  detailUser = null;
  dataChangePassword = null;
  showModalChangePassword: Boolean = false;
  showModalLoginApp: Boolean = false;
  listLoginAppUser = [];
  ls = new SecureLS();

  constructor(
    private config: ConfigService,
    private userServices: UsersService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getUser();
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
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  activeDeactiveUser(data) {
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
            .activatedUser({
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
                  this.getUser();
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

  deleteUser(data) {
    this.config
      .promptMessage("Are you sure?", "Delete User " + data.username, "warning")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.userServices
            .deleteUser({
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
                  this.getUser();
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

  modalEditUser(data) {
    this.detailUser = null;
    this.detailUser = data;
    this.showModalEditUser = true;
  }

  updateUser() {
    this.config.promptMessage("Are you sure?", "", "info").then(res => {
      if (res == true) {
        this.detailUser.updated_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.config.setFloading(true);
        this.userServices.updateUser(this.detailUser).subscribe(
          (response: any) => {
            this.config.setFloading(false);
            if (response.status == false) {
              this.config.errorMessage(JSON.stringify(response));
              this.showModalEditUser = false;
            } else {
              this.config.successMessage("SAVE", "Success!");
              this.showModalEditUser = false;
              this.getUser();
            }
          },
          error => {
            this.config.errorMessage(JSON.stringify(error));
            this.config.setFloading(false);
            this.showModalEditUser = false;
          }
        );
      }
    });
  }

  modalChangePassword(data) {
    this.dataChangePassword = null;
    this.dataChangePassword = data;
    this.dataChangePassword.password = "";
    this.dataChangePassword.confirmPassword = "";
    this.showModalChangePassword = true;
  }

  modalLoginUserApp(data) {
    this.config.setFloading(true);
    this.listLoginAppUser = [];
    this.userServices.getListUserLoginAppsByUserId(data.id).subscribe(
      (response: any) => {
        if (response.status == true) {
          this.config.setFloading(false);
          this.showModalLoginApp = true;
          this.listLoginAppUser = response.data;
        } else {
          this.config.errorMessage(JSON.stringify(response));
          this.config.setFloading(false);
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  changePassword() {
    if (!this.dataChangePassword.password) {
      this.config.infoMessage("REQUIRED", "Password cannot be empty!");
      return false;
    }

    if (!this.dataChangePassword.confirmPassword) {
      this.config.infoMessage(
        "REQUIRED",
        "Confirmation password cannot be empty!"
      );
      return false;
    }

    if (
      this.dataChangePassword.password.length < 8 ||
      this.dataChangePassword.confirmPassword.length < 8
    ) {
      this.config.infoMessage("INFO", "Password minimum 8 character!");
      return false;
    }

    if (
      this.dataChangePassword.password !=
      this.dataChangePassword.confirmPassword
    ) {
      this.config.infoMessage("INFO", "Password doesn't match!");
      return false;
    }

    this.config.promptMessage("Are you sure?", "", "info").then(res => {
      if (res == true) {
        this.dataChangePassword.updated_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.userServices.changePassword(this.dataChangePassword).subscribe(
          (response: any) => {
            this.config.setFloading(false);
            if (response.status == false) {
              this.config.errorMessage(JSON.stringify(response));
              this.showModalChangePassword = false;
            } else {
              this.config.successMessage("SAVE", "Success!");
              this.showModalChangePassword = false;
            }
          },
          error => {
            this.config.errorMessage(JSON.stringify(error));
            this.config.setFloading(false);
            this.showModalChangePassword = false;
          }
        );
      }
    });
  }

  logoutUserFromApps(data) {
    this.config
      .promptMessage(
        "LOGOUT",
        "Are you sure logout " +
          data.username +
          " from " +
          data.application_name +
          " ?",
        "info"
      )
      .then((res: any) => {
        if (res == true) {
          this.config.setFloading(true);
          this.userServices.logoutUserFromApp(data.id).subscribe(
            (response: any) => {
              if (response.status == false) {
                this.config.errorMessage(JSON.stringify(response));
                this.config.setFloading(false);
              } else {
                this.config.successMessage("Logout", "Success!");
                this.showModalLoginApp = false;
                this.config.setFloading(false);
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

  showDetailUser(data) {
    this.ls.remove("userDetail");
    this.ls.set("userDetail", data);
    this.route.navigate(["./landing/detail-user"]);
  }
}
