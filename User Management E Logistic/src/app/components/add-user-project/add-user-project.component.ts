import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { UsersService } from "src/app/services/users.service";
import { ConfigService } from "src/app/services/config.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-user-project",
  templateUrl: "./add-user-project.component.html",
  styleUrls: ["./add-user-project.component.scss"]
})
export class AddUserProjectComponent implements OnInit {
  ls = new SecureLS();
  userProject;
  listUser = [];
  listUserProject = [];
  showModalUser: Boolean = false;
  username;
  user;

  constructor(
    private route: Router,
    private config: ConfigService,
    private userServices: UsersService
  ) {
    if (!this.ls.get("userProjectId")) {
      this.route.navigate(["./landing/list-project"]);
    }
    try {
      this.userProject = this.ls.get("userProjectId");
      this.getUserProject();
    } catch (error) {
      this.route.navigate(["./landing/list-project"]);
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
    this.listUserProject.forEach(element => {
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
      plant_code: this.userProject.plant_code,
      project_name: this.userProject.project_name,
      created_by: this.ls.get("loggedUM").profileUser[0].username
    };
    this.config
      .promptMessage("SAVE", "Are you sure add " + this.username + " ?", "info")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.userServices.addUserProject(data).subscribe(
            (response: any) => {
              this.config.setFloading(false);
              if (response.status == false) {
                this.config.errorMessage(JSON.stringify(response));
                return false;
              } else {
                this.config.successMessage("SAVE", "Add user success!");
                this.user = null;
                this.username = "";
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
