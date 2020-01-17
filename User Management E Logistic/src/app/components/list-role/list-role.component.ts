import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { ConfigService } from "src/app/services/config.service";
import { RolesService } from "src/app/services/roles.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-role",
  templateUrl: "./list-role.component.html",
  styleUrls: ["./list-role.component.scss"]
})
export class ListRoleComponent implements OnInit {
  listRole = [];
  detailRole = null;
  showModalEditRole = false;
  ls = new SecureLS();

  constructor(
    private config: ConfigService,
    private roleServices: RolesService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getRole();
  }

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
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  activeDeactiveRole(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Activate Job " + data.job_desc
          : "Active Job " + data.job_desc,
        "info"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.roleServices
            .activatedRole({
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
                  this.getRole();
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

  deleteRole(data) {
    this.config
      .promptMessage("Are you sure?", "Delete Job " + data.job_desc, "warning")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.roleServices
            .deleteRole({
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
                  this.getRole();
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

  modalEditRole(data) {
    this.detailRole = null;
    this.detailRole = data;
    this.showModalEditRole = true;
  }

  updateRole() {
    this.config.promptMessage("Are you sure?", "", "info").then(res => {
      if (res == true) {
        this.detailRole.updated_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.config.setFloading(true);
        this.roleServices.updateRole(this.detailRole).subscribe(
          (response: any) => {
            this.config.setFloading(false);
            if (response.status == false) {
              this.config.errorMessage(JSON.stringify(response));
              this.showModalEditRole = false;
            } else {
              this.config.successMessage("SAVE", "Success!");
              this.showModalEditRole = false;
              this.getRole();
            }
          },
          error => {
            this.config.errorMessage(JSON.stringify(error));
            this.config.setFloading(false);
            this.showModalEditRole = false;
          }
        );
      }
    });
  }

  showUsersRoles(data) {
    this.ls.remove("roleId");
    this.ls.set("roleId", data);
    this.route.navigate(["./landing/list-role-job"]);
  }
}
