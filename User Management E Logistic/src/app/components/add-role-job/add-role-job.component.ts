import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/services/config.service";
import { JobsService } from "src/app/services/jobs.service";
import { RolesService } from "src/app/services/roles.service";

@Component({
  selector: "app-add-role-job",
  templateUrl: "./add-role-job.component.html",
  styleUrls: ["./add-role-job.component.scss"]
})
export class AddRoleJobComponent implements OnInit {
  ls = new SecureLS();
  listJob = [];
  listRoleJob = [];
  showModalJob: Boolean = false;
  role;
  job;
  jobname = "";

  constructor(
    private route: Router,
    private config: ConfigService,
    private roleServices: RolesService,
    private jobServices: JobsService
  ) {
    if (!this.ls.get("jobId")) {
      this.route.navigate(["./landing/list-role"]);
    }
    try {
      this.role = this.ls.get("roleId");
      this.getRoleJob();
    } catch (error) {
      this.route.navigate(["./landing/list-role"]);
    }
  }

  ngOnInit() {}

  getJob() {
    this.listJob = [];
    this.config.setFloading(true);
    this.jobServices.getJob().subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listJob = response.data;
          this.showModalJob = true;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  setJob(data) {
    this.job = null;
    this.jobname = "";
    let flagExistsJob: Boolean = false;
    this.listRoleJob.forEach(element => {
      if (element.job_desc == data.job_desc) {
        flagExistsJob = true;
      }
    });
    if (flagExistsJob == true) {
      this.config.infoMessage("INFO", "Job has been added!");
      this.showModalJob = false;
      return false;
    }
    this.job = data;
    this.jobname = data.job_desc;
    this.showModalJob = false;
  }

  getRoleJob() {
    this.listRoleJob = [];
    this.config.setFloading(true);
    this.roleServices.getRoleJob(this.role.id).subscribe(
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

  submit() {
    if (!this.jobname) {
      this.config.infoMessage("REQUIRED", "Job cannot be empty!");
      return false;
    }
    let data = {
      job_id: this.job.id,
      role_id: this.role.id,
      created_by: this.ls.get("loggedUM").profileUser[0].username
    };
    this.config
      .promptMessage("SAVE", "Are you sure add " + this.jobname + " ?", "info")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.roleServices.addRoleJob(data).subscribe(
            (response: any) => {
              this.config.setFloading(false);
              if (response.status == false) {
                this.config.errorMessage(JSON.stringify(response));
                return false;
              } else {
                this.config.successMessage("SAVE", "Add job success!");
                this.job = null;
                this.jobname = "";
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
