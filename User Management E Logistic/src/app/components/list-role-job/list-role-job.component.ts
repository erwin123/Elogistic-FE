import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { ConfigService } from "src/app/services/config.service";
import { RolesService } from "src/app/services/roles.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-role-job",
  templateUrl: "./list-role-job.component.html",
  styleUrls: ["./list-role-job.component.scss"]
})
export class ListRoleJobComponent implements OnInit {
  ls = new SecureLS();
  roleName = "";
  roleCode = "";
  roleId: Number;
  listRoleJob = [];

  constructor(
    private config: ConfigService,
    private roleServices: RolesService,
    private route: Router
  ) {
    if (!this.ls.get("roleId")) {
      this.route.navigate(["./landing/list-role"]);
    }
    try {
      this.roleName = this.ls.get("roleId").role_desc;
      this.roleCode = this.ls.get("roleId").role_code;
      this.roleId = this.ls.get("roleId").id;
      this.getRoleJob();
    } catch (error) {
      this.route.navigate(["./landing/list-role"]);
    }
  }

  ngOnInit() {}

  getRoleJob() {
    this.listRoleJob = [];
    this.config.setFloading(true);
    this.roleServices.getRoleJob(this.roleId).subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listRoleJob = response.data;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  activeDeactiveRoleJob(data) {
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
            .activatedRoleJob({
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
                  this.getRoleJob();
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

  deleteRoleJob(data) {
    this.config
      .promptMessage("Are you sure?", "Delete Job " + data.job_desc, "warning")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.roleServices
            .deleteRoleJob({
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
                  this.getRoleJob();
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
