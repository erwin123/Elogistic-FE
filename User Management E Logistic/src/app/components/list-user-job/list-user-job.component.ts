import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { ConfigService } from "src/app/services/config.service";
import { JobsService } from "src/app/services/jobs.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-user-job",
  templateUrl: "./list-user-job.component.html",
  styleUrls: ["./list-user-job.component.scss"]
})
export class ListUserJobComponent implements OnInit {
  ls = new SecureLS();
  jobName = "";
  jobCode = "";
  jobId: Number;
  listUserJob = [];

  constructor(
    private config: ConfigService,
    private jobServices: JobsService,
    private route: Router
  ) {
    if (!this.ls.get("jobId")) {
      this.route.navigate(["./landing/list-job"]);
    }
    try {
      this.jobName = this.ls.get("jobId").job_desc;
      this.jobCode = this.ls.get("jobId").job_code;
      this.jobId = this.ls.get("jobId").id;
      this.getUserJob();
    } catch (error) {
      this.route.navigate(["./landing/list-job"]);
    }
  }

  ngOnInit() {}

  getUserJob() {
    this.listUserJob = [];
    this.config.setFloading(true);
    this.jobServices.getUsersJob(this.jobId).subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listUserJob = response.data;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  activeDeactiveUserJob(data) {
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
          this.jobServices
            .activatedUserJob({
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
                  this.getUserJob();
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

  deleteUserJob(data) {
    this.config
      .promptMessage("Are you sure?", "Delete User " + data.username, "warning")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.jobServices
            .deleteUserJob({
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
                  this.getUserJob();
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
